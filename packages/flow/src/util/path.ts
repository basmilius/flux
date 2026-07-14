import type { FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';

export type FluxFlowPath = {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
};

const isVertical = (side: FluxFlowSide): boolean => side === 'top' || side === 'bottom';

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

function offsetPoint(point: FluxFlowPosition, side: FluxFlowSide, offset: number): FluxFlowPosition {
    const [nx, ny] = sideNormal(side);
    return {x: point.x + nx * offset, y: point.y + ny * offset};
}

function polylineMidpoint(points: readonly FluxFlowPosition[]): FluxFlowPosition {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
        total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    }

    let target = total / 2;
    for (let i = 1; i < points.length; i++) {
        const segment = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
        if (segment >= target) {
            const ratio = segment === 0 ? 0 : target / segment;
            return {
                x: points[i - 1].x + (points[i].x - points[i - 1].x) * ratio,
                y: points[i - 1].y + (points[i].y - points[i - 1].y) * ratio
            };
        }
        target -= segment;
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

export function getSmoothStepPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, radius: number = 28, offset: number = 15): FluxFlowPath {
    const sourceStub = offsetPoint(source, sourceSide, offset);
    const targetStub = offsetPoint(target, targetSide, offset);

    const points: FluxFlowPosition[] = [source, sourceStub];

    if (isVertical(sourceSide) && isVertical(targetSide)) {
        const midY = (sourceStub.y + targetStub.y) / 2;
        points.push({x: sourceStub.x, y: midY}, {x: targetStub.x, y: midY});
    } else if (!isVertical(sourceSide) && !isVertical(targetSide)) {
        const midX = (sourceStub.x + targetStub.x) / 2;
        points.push({x: midX, y: sourceStub.y}, {x: midX, y: targetStub.y});
    } else if (isVertical(sourceSide)) {
        points.push({x: sourceStub.x, y: targetStub.y});
    } else {
        points.push({x: targetStub.x, y: sourceStub.y});
    }

    points.push(targetStub, target);

    const midpoint = polylineMidpoint(points);

    return {
        path: roundedPath(points, radius),
        labelX: midpoint.x,
        labelY: midpoint.y
    };
}
