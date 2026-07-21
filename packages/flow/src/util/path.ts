import type { FluxFlowMarker, FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';
import { isVerticalSide } from './geometry';

export type FluxFlowPath = {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
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
 * Builds the shape of an endpoint marker. `direction` is the unit vector along
 * the line, pointing away from the endpoint. Markers are plain paths rather
 * than SVG markers, so they inherit the connector's color without needing a
 * marker definition per edge.
 *
 * `arrow` and `chevron` sit at the tip; the rest centre on the endpoint.
 */
export function markerPath(marker: FluxFlowMarker, point: FluxFlowPosition, direction: readonly [number, number]): string {
    const [nx, ny] = direction;
    // The perpendicular of `direction`, so a marker can be laid out across the
    // line as well as along it.
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
 * Where a connector's label rides.
 *
 * A straight run has only one leg, so the label takes the middle of the line.
 * A routed one does not: two branches leaving the same node share their first
 * leg, and a label halfway along the path can land on that shared stretch, or
 * on a bend. There the label takes the middle of the last real leg, the one
 * carrying the connector into its target, which is always the branch's own.
 */
function labelPoint(points: readonly FluxFlowPosition[], stub: number): FluxFlowPosition {
    const first = points[0];
    const last = points[points.length - 1];
    const middle = {x: (first.x + last.x) / 2, y: (first.y + last.y) / 2};

    const straight = points.every(point => Math.abs(point.x - first.x) < 0.5)
        || points.every(point => Math.abs(point.y - first.y) < 0.5);

    if (straight) {
        return middle;
    }

    for (let i = points.length - 1; i > 0; i--) {
        const from = points[i - 1];
        const to = points[i];

        if (Math.hypot(to.x - from.x, to.y - from.y) > stub) {
            return {x: (from.x + to.x) / 2, y: (from.y + to.y) / 2};
        }
    }

    return middle;
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

export function getStraightPath(source: FluxFlowPosition, target: FluxFlowPosition): FluxFlowPath {
    return {
        path: `M ${source.x} ${source.y} L ${target.x} ${target.y}`,
        labelX: (source.x + target.x) / 2,
        labelY: (source.y + target.y) / 2
    };
}

export function getBezierPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, curvature: number = 0.25): FluxFlowPath {
    const [snx, sny] = sideNormal(sourceSide);
    const [tnx, tny] = sideNormal(targetSide);
    const distance = Math.hypot(target.x - source.x, target.y - source.y);
    const offset = Math.max(distance * curvature, 30);

    const c1 = {x: source.x + snx * offset, y: source.y + sny * offset};
    const c2 = {x: target.x + tnx * offset, y: target.y + tny * offset};

    return {
        path: `M ${source.x} ${source.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${target.x} ${target.y}`,
        labelX: 0.125 * source.x + 0.375 * c1.x + 0.375 * c2.x + 0.125 * target.x,
        labelY: 0.125 * source.y + 0.375 * c1.y + 0.375 * c2.y + 0.125 * target.y
    };
}

export function getSmoothStepPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, radius: number = 15, offset: number = 15): FluxFlowPath {
    const sourceStub = offsetPoint(source, sourceSide, offset);
    const targetStub = offsetPoint(target, targetSide, offset);

    const points: FluxFlowPosition[] = [source, sourceStub];

    if (isVerticalSide(sourceSide) && isVerticalSide(targetSide)) {
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

    const label = labelPoint(points, offset);

    return {
        path: roundedPath(points, radius),
        labelX: label.x,
        labelY: label.y
    };
}
