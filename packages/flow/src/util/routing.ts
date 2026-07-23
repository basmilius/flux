import type { FluxFlowBounds, FluxFlowLabelPlacement, FluxFlowNodeRecord, FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';
import { isVerticalSide } from './geometry';
import { type FluxFlowPath, labelPoint, offsetPoint, roundedPath, unitVector } from './path';

/**
 * Obstacle-aware connector routing: it keeps an orthogonal line clear of the
 * cards it would otherwise cross. It leans on the manual `waypoints` prop for
 * the cases it cannot solve cleanly, and the connectors draw under the cards
 * regardless, so a route that still clips one tucks away behind it.
 */

// How far a routed line stands off a card it passes, on top of the gap the
// endpoint already keeps.
const OBSTACLE_MARGIN = 12;

/**
 * The cards a connector between `fromId` and `toId` should keep clear of: every
 * other node, grown by `margin` so the line does not graze a corner.
 */
export function collectObstacles(nodes: Iterable<FluxFlowNodeRecord>, fromId: string, toId: string, margin: number = OBSTACLE_MARGIN): FluxFlowBounds[] {
    const obstacles: FluxFlowBounds[] = [];

    for (const node of nodes) {
        if (node.id === fromId || node.id === toId) {
            continue;
        }

        const {x, y} = node.position.value;
        const {width, height} = node.size.value;

        if (width === 0 || height === 0) {
            continue;
        }

        obstacles.push({minX: x - margin, minY: y - margin, maxX: x + width + margin, maxY: y + height + margin});
    }

    return obstacles;
}

/**
 * The orthogonal channel a smoothstep would draw, with the rail it turns on slid
 * to whichever position keeps all three legs clear of the cards. It handles the
 * common case of a card sitting in one channel; a route it cannot untangle is
 * still drawn under the cards, and the author can fall back to manual waypoints.
 */
export function routeAvoid(from: FluxFlowPosition, fromSide: FluxFlowSide, to: FluxFlowPosition, toSide: FluxFlowSide, obstacles: readonly FluxFlowBounds[], placement: FluxFlowLabelPlacement = 'center', offset: number = 15, radius: number = 15): FluxFlowPath {
    const fromStub = offsetPoint(from, fromSide, offset);
    const toStub = offsetPoint(to, toSide, offset);

    const middle = isVerticalSide(fromSide) && isVerticalSide(toSide)
        ? channel(fromStub, toStub, obstacles, 'vertical')
        : !isVerticalSide(fromSide) && !isVerticalSide(toSide)
            ? channel(fromStub, toStub, obstacles, 'horizontal')
            : elbow(fromStub, toStub, isVerticalSide(fromSide));

    return toPath([from, ...middle, to], radius, placement, offset);
}

function toPath(points: readonly FluxFlowPosition[], radius: number, placement: FluxFlowLabelPlacement, stub: number): FluxFlowPath {
    const label = labelPoint(points, placement, stub);
    const last = points.length - 1;

    return {
        path: roundedPath(points, radius),
        labelX: label.x,
        labelY: label.y,
        fromDirection: unitVector(points[0], points[1] ?? points[0]),
        toDirection: unitVector(points[last], points[last - 1] ?? points[last])
    };
}

/**
 * The two turning points of a channel route, on the axis the two stubs face.
 * When the stubs line up there is no rail to slide, so the run steps sideways
 * around any card blocking the straight shot instead.
 */
function channel(from: FluxFlowPosition, to: FluxFlowPosition, obstacles: readonly FluxFlowBounds[], orientation: 'vertical' | 'horizontal'): FluxFlowPosition[] {
    const vertical = orientation === 'vertical';
    const alongFrom = vertical ? from.x : from.y;
    const alongTo = vertical ? to.x : to.y;
    const acrossFrom = vertical ? from.y : from.x;
    const acrossTo = vertical ? to.y : to.x;

    // Stubs aligned on the travel axis: the rail collapses onto a straight run,
    // so escape to the side of whatever blocks it rather than slide the rail.
    if (Math.abs(alongFrom - alongTo) < 1) {
        const blocking = obstacles.filter(obstacle => segmentIntersectsRect(from, to, obstacle));

        if (blocking.length === 0) {
            return [];
        }

        const rail = escape(alongFrom, blocking, vertical);

        return vertical
            ? [{x: rail, y: acrossFrom}, {x: rail, y: acrossTo}]
            : [{x: acrossFrom, y: rail}, {x: acrossTo, y: rail}];
    }

    const preferred = (acrossFrom + acrossTo) / 2;
    const rail = clearRail(preferred, obstacles, from, to, vertical);

    return vertical
        ? [{x: from.x, y: rail}, {x: to.x, y: rail}]
        : [{x: rail, y: from.y}, {x: rail, y: to.y}];
}

/**
 * The rail position closest to the middle that keeps the three legs of a channel
 * route clear, trying the far edge of each obstacle before giving up on the
 * middle.
 */
function clearRail(preferred: number, obstacles: readonly FluxFlowBounds[], from: FluxFlowPosition, to: FluxFlowPosition, vertical: boolean): number {
    const isClear = (rail: number): boolean => {
        const [a, b] = vertical
            ? [{x: from.x, y: rail}, {x: to.x, y: rail}]
            : [{x: rail, y: from.y}, {x: rail, y: to.y}];

        return !obstacles.some(obstacle => segmentIntersectsRect(from, a, obstacle)
            || segmentIntersectsRect(a, b, obstacle)
            || segmentIntersectsRect(b, to, obstacle));
    };

    if (isClear(preferred)) {
        return preferred;
    }

    const candidates = obstacles.flatMap(obstacle => vertical
        ? [obstacle.minY - OBSTACLE_MARGIN, obstacle.maxY + OBSTACLE_MARGIN]
        : [obstacle.minX - OBSTACLE_MARGIN, obstacle.maxX + OBSTACLE_MARGIN])
        .sort((a, b) => Math.abs(a - preferred) - Math.abs(b - preferred));

    for (const candidate of candidates) {
        if (isClear(candidate)) {
            return candidate;
        }
    }

    return preferred;
}

/**
 * The nearer side to pass a bundle of blocking cards on, one margin clear of it.
 */
function escape(along: number, blocking: readonly FluxFlowBounds[], vertical: boolean): number {
    const near = Math.min(...blocking.map(obstacle => vertical ? obstacle.minX : obstacle.minY)) - OBSTACLE_MARGIN;
    const far = Math.max(...blocking.map(obstacle => vertical ? obstacle.maxX : obstacle.maxY)) + OBSTACLE_MARGIN;

    return along - near <= far - along ? near : far;
}

/**
 * The single corner an L-route turns, for a connector leaving on one axis and
 * arriving on the other.
 */
function elbow(from: FluxFlowPosition, to: FluxFlowPosition, fromVertical: boolean): FluxFlowPosition[] {
    return [fromVertical ? {x: from.x, y: to.y} : {x: to.x, y: from.y}];
}

/**
 * Whether the segment `a`-`b` passes through the rectangle, by Liang-Barsky
 * clipping: the run is kept where it stays inside every edge's slab, and a slab
 * that clips it away entirely means it misses.
 */
function segmentIntersectsRect(a: FluxFlowPosition, b: FluxFlowPosition, rect: FluxFlowBounds): boolean {
    if (rect.maxX <= rect.minX || rect.maxY <= rect.minY) {
        return false;
    }

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const limits = [
        [-dx, a.x - rect.minX],
        [dx, rect.maxX - a.x],
        [-dy, a.y - rect.minY],
        [dy, rect.maxY - a.y]
    ] as const;

    let enter = 0;
    let leave = 1;

    for (const [p, q] of limits) {
        if (p === 0) {
            if (q < 0) {
                return false;
            }

            continue;
        }

        const t = q / p;

        if (p < 0) {
            enter = Math.max(enter, t);
        } else {
            leave = Math.min(leave, t);
        }
    }

    return enter < leave;
}
