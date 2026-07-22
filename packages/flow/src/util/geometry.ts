import type { FluxFlowAlign, FluxFlowBounds, FluxFlowDirection, FluxFlowNodeRecord, FluxFlowPortRecord, FluxFlowPosition, FluxFlowSide, FluxFlowSize } from '~flux/flow/data';

/**
 * Where a `start` connector lands on a node that publishes no anchor of its own.
 * Matches the icon of a FluxFlowCard: 15px header padding + 30px icon / 2.
 */
export const FALLBACK_INSET = 30;

function center(position: FluxFlowPosition, size: FluxFlowSize): FluxFlowPosition {
    return {x: position.x + size.width / 2, y: position.y + size.height / 2};
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * The box around a set of nodes, or `null` when there are none.
 */
export function boundsOfNodes(nodes: Iterable<FluxFlowNodeRecord>): FluxFlowBounds | null {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of nodes) {
        const {x, y} = node.position.value;
        const {width, height} = node.size.value;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    }

    return Number.isFinite(minX) ? {minX, minY, maxX, maxY} : null;
}

/**
 * Where along a side of `extent` a connector lands, with `inset` the distance
 * from the corner to the node's own anchor. A node narrower than twice that has
 * no room for both ends, so `start` and `end` collapse onto the centre.
 */
export function alignOffset(extent: number, align: FluxFlowAlign, inset: number): number {
    const clamped = Math.min(inset, extent / 2);

    switch (align) {
        case 'start':
            return clamped;
        case 'center':
            return extent / 2;
        case 'end':
            return extent - clamped;
    }
}

export function isVerticalSide(side: FluxFlowSide): boolean {
    return side === 'top' || side === 'bottom';
}

export function anchorPoint(position: FluxFlowPosition, size: FluxFlowSize, side: FluxFlowSide, align: FluxFlowAlign = 'center', anchor: FluxFlowPosition | null = null): FluxFlowPosition {
    if (isVerticalSide(side)) {
        return {
            x: position.x + alignOffset(size.width, align, anchor?.x ?? FALLBACK_INSET),
            y: side === 'top' ? position.y : position.y + size.height
        };
    }

    return {
        x: side === 'left' ? position.x : position.x + size.width,
        y: position.y + alignOffset(size.height, align, anchor?.y ?? FALLBACK_INSET)
    };
}

/**
 * Where a connector leaves and re-enters the same node.
 *
 * Looping on one side, the two points sit a quarter in from either end of it, so
 * the loop spans half the side and reads as a run back rather than as a line
 * doubling over itself. It leaves at the far point and comes back in at the near
 * one. Looping between two different sides, each end takes the middle of the
 * side it uses: they are distinct points already, and the middle keeps the route
 * around the node symmetrical.
 */
export function selfLoopPoints(position: FluxFlowPosition, size: FluxFlowSize, fromSide: FluxFlowSide, toSide: FluxFlowSide): readonly [FluxFlowPosition, FluxFlowPosition] {
    if (fromSide !== toSide) {
        return [
            anchorPoint(position, size, fromSide, 'center'),
            anchorPoint(position, size, toSide, 'center')
        ];
    }

    if (isVerticalSide(fromSide)) {
        const y = fromSide === 'top' ? position.y : position.y + size.height;

        return [
            {x: position.x + (size.width / 4) * 3, y},
            {x: position.x + size.width / 4, y}
        ];
    }

    const x = fromSide === 'left' ? position.x : position.x + size.width;

    return [
        {x, y: position.y + (size.height / 4) * 3},
        {x, y: position.y + size.height / 4}
    ];
}

/**
 * The edge of a node an offset inside it sits closest to.
 */
export function nearestSide(size: FluxFlowSize, offset: FluxFlowPosition): FluxFlowSide {
    const distances: readonly (readonly [FluxFlowSide, number])[] = [
        ['left', offset.x],
        ['right', size.width - offset.x],
        ['top', offset.y],
        ['bottom', size.height - offset.y]
    ];

    return distances.reduce((nearest, candidate) => candidate[1] < nearest[1] ? candidate : nearest)[0];
}

/**
 * The side a port attaches to: the one it names, or the edge it sits closest to.
 */
export function portSide(port: FluxFlowPortRecord, size: FluxFlowSize): FluxFlowSide {
    return port.side ?? nearestSide(size, port.offset);
}

/**
 * Where a connector lands on a node through one of its ports. The port fixes
 * the position along the side, the side fixes which edge it lands on.
 */
export function portPoint(position: FluxFlowPosition, size: FluxFlowSize, side: FluxFlowSide, offset: FluxFlowPosition): FluxFlowPosition {
    if (isVerticalSide(side)) {
        return {
            x: position.x + clamp(offset.x, 0, size.width),
            y: side === 'top' ? position.y : position.y + size.height
        };
    }

    return {
        x: side === 'left' ? position.x : position.x + size.width,
        y: position.y + clamp(offset.y, 0, size.height)
    };
}

/**
 * The most natural pair of sides for a connection: a vertical stack connects
 * bottom -> top, a horizontal one right -> left.
 *
 * With an `axis` that axis wins, however the two nodes happen to lie. Picking
 * the shorter one is right for a loose pair, but wrong once a row is wider than
 * the gap between two rows: the line then crosses back over the nodes it runs
 * between.
 */
export function autoSides(sourcePosition: FluxFlowPosition, sourceSize: FluxFlowSize, targetPosition: FluxFlowPosition, targetSize: FluxFlowSize, axis?: FluxFlowDirection): readonly [FluxFlowSide, FluxFlowSide] {
    const source = center(sourcePosition, sourceSize);
    const target = center(targetPosition, targetSize);
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const vertical = axis ? axis === 'vertical' : Math.abs(dy) >= Math.abs(dx);

    if (vertical) {
        return dy >= 0 ? ['bottom', 'top'] : ['top', 'bottom'];
    }

    return dx >= 0 ? ['right', 'left'] : ['left', 'right'];
}
