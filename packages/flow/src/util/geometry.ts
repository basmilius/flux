import type { FluxFlowAlign, FluxFlowPortRecord, FluxFlowPosition, FluxFlowSide, FluxFlowSize } from '~flux/flow/data';

// Where a `start` connector lands on a node that publishes no anchor of its
// own. Matches the icon of a FluxFlowCard: 15px header padding + 30px icon / 2.
const FALLBACK_INSET = 30;

function center(position: FluxFlowPosition, size: FluxFlowSize): FluxFlowPosition {
    return {x: position.x + size.width / 2, y: position.y + size.height / 2};
}

function clamp(value: number, max: number): number {
    return Math.min(Math.max(value, 0), max);
}

/**
 * Where along a side of `extent` a connector lands. `inset` is how far the
 * node's own anchor sits from its corner on that axis. A node narrower than
 * twice the inset has no room for both ends, so `start` and `end` collapse onto
 * the centre rather than reaching past it.
 */
function alignOffset(extent: number, align: FluxFlowAlign, inset: number): number {
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
            x: position.x + clamp(offset.x, size.width),
            y: side === 'top' ? position.y : position.y + size.height
        };
    }

    return {
        x: side === 'left' ? position.x : position.x + size.width,
        y: position.y + clamp(offset.y, size.height)
    };
}

/**
 * Picks the most natural pair of sides for a connection based on the relative
 * position of the two nodes: vertical stacks connect bottom -> top, horizontal
 * stacks connect right -> left.
 */
export function autoSides(sourcePosition: FluxFlowPosition, sourceSize: FluxFlowSize, targetPosition: FluxFlowPosition, targetSize: FluxFlowSize): readonly [FluxFlowSide, FluxFlowSide] {
    const source = center(sourcePosition, sourceSize);
    const target = center(targetPosition, targetSize);
    const dx = target.x - source.x;
    const dy = target.y - source.y;

    if (Math.abs(dy) >= Math.abs(dx)) {
        return dy >= 0 ? ['bottom', 'top'] : ['top', 'bottom'];
    }

    return dx >= 0 ? ['right', 'left'] : ['left', 'right'];
}
