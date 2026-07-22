import type { FluxFlowBounds, FluxFlowLabelPlacement, FluxFlowMarker, FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';
import { isVerticalSide } from './geometry';

export type FluxFlowPath = {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
    /**
     * The unit vectors along the first and the last leg of the route, pointing
     * away from the endpoint they belong to. The endpoint markers follow them.
     */
    readonly fromDirection: readonly [number, number];
    readonly toDirection: readonly [number, number];
};

export function sideNormal(side: FluxFlowSide): readonly [number, number] {
    switch (side) {
        case 'top':
            return [0, -1];
        case 'bottom':
            return [0, 1];
        case 'left':
            return [-1, 0];
        case 'right':
            return [1, 0];
    }
}

export function offsetPoint(point: FluxFlowPosition, side: FluxFlowSide, offset: number): FluxFlowPosition {
    const [nx, ny] = sideNormal(side);
    return {x: point.x + nx * offset, y: point.y + ny * offset};
}

/**
 * Builds the shape of an endpoint marker, where `direction` is the unit vector
 * along the line pointing away from the endpoint. Plain paths rather than SVG
 * markers, so they inherit the connector's color without a definition per edge.
 *
 * `arrow` and `chevron` sit at the tip; the rest centre on the endpoint.
 */
export function markerPath(marker: FluxFlowMarker, point: FluxFlowPosition, direction: readonly [number, number]): string {
    const [nx, ny] = direction;
    // The perpendicular, to lay a marker out across the line as well as along it.
    const [px, py] = [ny, nx];

    const along = (distance: number): FluxFlowPosition => ({x: point.x + nx * distance, y: point.y + ny * distance});
    const across = (from: FluxFlowPosition, distance: number): FluxFlowPosition => ({x: from.x + px * distance, y: from.y + py * distance});

    switch (marker) {
        case 'chevron': {
            const back = along(6);
            return `M ${across(back, 6).x} ${across(back, 6).y} L ${point.x} ${point.y} L ${across(back, -6).x} ${across(back, -6).y}`;
        }

        case 'arrow': {
            const back = along(10);
            return `M ${point.x} ${point.y} L ${across(back, 5).x} ${across(back, 5).y} L ${across(back, -5).x} ${across(back, -5).y} Z`;
        }

        case 'bar': {
            return `M ${across(point, 6).x} ${across(point, 6).y} L ${across(point, -6).x} ${across(point, -6).y}`;
        }

        // Equal reach along and across the line, so all four sides match.
        case 'diamond': {
            const near = along(6);
            const far = along(-6);
            return `M ${near.x} ${near.y} L ${across(point, 6).x} ${across(point, 6).y} L ${far.x} ${far.y} L ${across(point, -6).x} ${across(point, -6).y} Z`;
        }

        case 'square': {
            const near = along(5);
            const far = along(-5);
            return `M ${across(near, 5).x} ${across(near, 5).y} L ${across(near, -5).x} ${across(near, -5).y} L ${across(far, -5).x} ${across(far, -5).y} L ${across(far, 5).x} ${across(far, 5).y} Z`;
        }

        case 'dot': {
            // Two half-circles, because SVG has no single-command circle in a path.
            const near = along(5);
            const far = along(-5);
            return `M ${near.x} ${near.y} A 5 5 0 1 0 ${far.x} ${far.y} A 5 5 0 1 0 ${near.x} ${near.y} Z`;
        }

        case 'none':
            return '';
    }
}

/**
 * Where a connector's label rides. A run without a bend has a single leg, so it
 * always takes the middle of the line; a bent one follows `placement`, skipping
 * any leg no longer than `stub` (the piece it uses to leave its node).
 */
function labelPoint(points: readonly FluxFlowPosition[], placement: FluxFlowLabelPlacement, stub: number): FluxFlowPosition {
    if (placement === 'center') {
        return pointAtHalfLength(points);
    }

    const first = points[0];
    const straight = points.every(point => Math.abs(point.x - first.x) < 0.5)
        || points.every(point => Math.abs(point.y - first.y) < 0.5);

    if (straight) {
        return pointAtHalfLength(points);
    }

    const legs = points.map((_, index) => index).slice(1);
    const order = placement === 'first-leg' ? legs : legs.reverse();

    for (const index of order) {
        const from = points[index - 1];
        const to = points[index];

        if (Math.hypot(to.x - from.x, to.y - from.y) > stub) {
            return {x: (from.x + to.x) / 2, y: (from.y + to.y) / 2};
        }
    }

    return pointAtHalfLength(points);
}

function unitVector(from: FluxFlowPosition, to: FluxFlowPosition): readonly [number, number] {
    const length = Math.hypot(to.x - from.x, to.y - from.y);

    return length === 0 ? [0, 0] : [(to.x - from.x) / length, (to.y - from.y) / length];
}

/**
 * The middle of a route measured along its length, so a label rides the halfway
 * point of the whole run instead of the middle of its first leg.
 */
function pointAtHalfLength(points: readonly FluxFlowPosition[]): FluxFlowPosition {
    const lengths = points.slice(1).map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
    const half = lengths.reduce((total, length) => total + length, 0) / 2;

    let travelled = 0;

    for (let i = 0; i < lengths.length; i++) {
        if (travelled + lengths[i] >= half) {
            const ratio = lengths[i] === 0 ? 0 : (half - travelled) / lengths[i];

            return {
                x: points[i].x + (points[i + 1].x - points[i].x) * ratio,
                y: points[i].y + (points[i + 1].y - points[i].y) * ratio
            };
        }

        travelled += lengths[i];
    }

    return points[points.length - 1];
}

function dedupe(points: readonly FluxFlowPosition[]): FluxFlowPosition[] {
    const out: FluxFlowPosition[] = [];
    for (const point of points) {
        const last = out[out.length - 1];
        if (!last || Math.abs(last.x - point.x) > 0.01 || Math.abs(last.y - point.y) > 0.01) {
            out.push(point);
        }
    }
    return out;
}

function roundedPath(rawPoints: readonly FluxFlowPosition[], radius: number): string {
    const points = dedupe(rawPoints);

    if (points.length < 2) {
        return '';
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
        const previous = points[i - 1];
        const current = points[i];
        const next = points[i + 1];

        const inLength = Math.hypot(current.x - previous.x, current.y - previous.y);
        const outLength = Math.hypot(next.x - current.x, next.y - current.y);
        const cornerRadius = Math.min(radius, inLength / 2, outLength / 2);

        const inRatio = inLength === 0 ? 0 : cornerRadius / inLength;
        const outRatio = outLength === 0 ? 0 : cornerRadius / outLength;

        const start = {
            x: current.x - (current.x - previous.x) * inRatio,
            y: current.y - (current.y - previous.y) * inRatio
        };
        const end = {
            x: current.x + (next.x - current.x) * outRatio,
            y: current.y + (next.y - current.y) * outRatio
        };

        path += ` L ${start.x} ${start.y} Q ${current.x} ${current.y} ${end.x} ${end.y}`;
    }

    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;

    return path;
}

/**
 * A run of straight legs through the waypoints. A straight connector rarely
 * leaves along the side normal, so its markers follow the line itself.
 */
export function getStraightPath(source: FluxFlowPosition, target: FluxFlowPosition, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center'): FluxFlowPath {
    const points = [source, ...waypoints, target];
    // A straight run has no stub to skip: every leg is one the caller drew.
    const label = labelPoint(points, placement, 0);

    return {
        path: points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' '),
        labelX: label.x,
        labelY: label.y,
        fromDirection: unitVector(source, points[1]),
        toDirection: unitVector(target, points[points.length - 2])
    };
}

/**
 * A Catmull-Rom spline through the points, as cubic segments. Only for a routed
 * bezier: a plain one curves nicer off a control point per side normal.
 */
function getSplinePath(points: readonly FluxFlowPosition[], placement: FluxFlowLabelPlacement): FluxFlowPath {
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const previous = points[i - 1] ?? points[i];
        const current = points[i];
        const next = points[i + 1];
        const after = points[i + 2] ?? next;

        const c1 = {x: current.x + (next.x - previous.x) / 6, y: current.y + (next.y - previous.y) / 6};
        const c2 = {x: next.x - (after.x - current.x) / 6, y: next.y - (after.y - current.y) / 6};

        path += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${next.x} ${next.y}`;
    }

    const label = labelPoint(points, placement, 0);

    return {
        path,
        labelX: label.x,
        labelY: label.y,
        fromDirection: unitVector(points[0], points[1]),
        toDirection: unitVector(points[points.length - 1], points[points.length - 2])
    };
}

export function getBezierPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center', curvature: number = 0.25): FluxFlowPath {
    if (waypoints.length > 0) {
        return getSplinePath([source, ...waypoints, target], placement);
    }

    const [snx, sny] = sideNormal(sourceSide);
    const [tnx, tny] = sideNormal(targetSide);
    const distance = Math.hypot(target.x - source.x, target.y - source.y);
    const offset = Math.max(distance * curvature, 30);

    const c1 = {x: source.x + snx * offset, y: source.y + sny * offset};
    const c2 = {x: target.x + tnx * offset, y: target.y + tny * offset};

    // A single curve has no legs to choose between, so its label always rides
    // the middle of the curve itself.
    return {
        path: `M ${source.x} ${source.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${target.x} ${target.y}`,
        labelX: 0.125 * source.x + 0.375 * c1.x + 0.375 * c2.x + 0.125 * target.x,
        labelY: 0.125 * source.y + 0.375 * c1.y + 0.375 * c2.y + 0.125 * target.y,
        fromDirection: sideNormal(sourceSide),
        toDirection: sideNormal(targetSide)
    };
}

/**
 * How far a self loop bulges out past the side it leaves on. Wide enough to
 * clear a badge riding the outer leg.
 */
export const SELF_LOOP_REACH = 45;

/**
 * A connector onto the node it left: out of one side and back into a side of the
 * same node. Both ends leave along their side normal, so the markers point out
 * of and into the card the way they do on any other connector.
 *
 * The two sides decide how far around the node the route travels: the same side
 * is a plain ear, two adjacent sides turn a corner, and two opposite sides wrap
 * the node along the axis they do not use. `bounds` is the node the route has to
 * clear, already grown by the gap the connector keeps from it.
 *
 * The points are handed back along with the path, since they are what the canvas
 * has to size itself on: the route reaches well past the node it belongs to.
 */
export function getSelfLoopPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, bounds: FluxFlowBounds, reach: number = SELF_LOOP_REACH, radius: number = 15): FluxFlowPath & { readonly points: readonly FluxFlowPosition[] } {
    const outSource = offsetPoint(source, sourceSide, reach);
    const outTarget = offsetPoint(target, targetSide, reach);
    const points = [source, outSource, ...bridge(outSource, sourceSide, outTarget, targetSide, bounds, reach), outTarget, target];

    // Every leg out and back is the same length, so the halfway point of the run
    // lands on the stretch furthest from the node: where a label belongs.
    const label = pointAtHalfLength(points);

    return {
        path: roundedPath(points, radius),
        labelX: label.x,
        labelY: label.y,
        fromDirection: sideNormal(sourceSide),
        toDirection: sideNormal(targetSide),
        points
    };
}

/**
 * The corners a self loop needs between the two points it stands off the node
 * on. None on one side, since those two already face each other; one to turn
 * between two adjacent sides; and two to carry the route around the node when it
 * leaves and enters on opposite ones.
 */
function bridge(outSource: FluxFlowPosition, sourceSide: FluxFlowSide, outTarget: FluxFlowPosition, targetSide: FluxFlowSide, bounds: FluxFlowBounds, reach: number): FluxFlowPosition[] {
    if (sourceSide === targetSide) {
        return [];
    }

    if (isVerticalSide(sourceSide) === isVerticalSide(targetSide)) {
        // Opposite sides: pass the node on the off axis, clearing the near edge
        // by the same reach the two ends stand off their own side.
        if (isVerticalSide(sourceSide)) {
            const x = bounds.minX - reach;

            return [{x, y: outSource.y}, {x, y: outTarget.y}];
        }

        const y = bounds.minY - reach;

        return [{x: outSource.x, y}, {x: outTarget.x, y}];
    }

    // Adjacent sides: a single corner, taking the outward coordinate of each.
    return [isVerticalSide(sourceSide)
        ? {x: outTarget.x, y: outSource.y}
        : {x: outSource.x, y: outTarget.y}];
}

export function getSmoothStepPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center', radius: number = 15, offset: number = 15): FluxFlowPath {
    const sourceStub = offsetPoint(source, sourceSide, offset);
    const targetStub = offsetPoint(target, targetSide, offset);

    const points: FluxFlowPosition[] = [source, sourceStub];

    if (waypoints.length > 0) {
        points.push(...waypoints);
    } else if (isVerticalSide(sourceSide) && isVerticalSide(targetSide)) {
        const midY = (sourceStub.y + targetStub.y) / 2;
        points.push({x: sourceStub.x, y: midY}, {x: targetStub.x, y: midY});
    } else if (!isVerticalSide(sourceSide) && !isVerticalSide(targetSide)) {
        const midX = (sourceStub.x + targetStub.x) / 2;
        points.push({x: midX, y: sourceStub.y}, {x: midX, y: targetStub.y});
    } else if (isVerticalSide(sourceSide)) {
        points.push({x: sourceStub.x, y: targetStub.y});
    } else {
        points.push({x: targetStub.x, y: sourceStub.y});
    }

    points.push(targetStub, target);

    const label = labelPoint(points, placement, offset);

    return {
        path: roundedPath(points, radius),
        labelX: label.x,
        labelY: label.y,
        fromDirection: sideNormal(sourceSide),
        toDirection: sideNormal(targetSide)
    };
}
