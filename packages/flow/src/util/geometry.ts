import type { FluxFlowPosition, FluxFlowSide, FluxFlowSize } from '~flux/flow/data';

function center(position: FluxFlowPosition, size: FluxFlowSize): FluxFlowPosition {
    return {x: position.x + size.width / 2, y: position.y + size.height / 2};
}

export function anchorPoint(position: FluxFlowPosition, size: FluxFlowSize, side: FluxFlowSide): FluxFlowPosition {
    switch (side) {
        case 'top':
            return {x: position.x + size.width / 2, y: position.y};
        case 'bottom':
            return {x: position.x + size.width / 2, y: position.y + size.height};
        case 'left':
            return {x: position.x, y: position.y + size.height / 2};
        case 'right':
            return {x: position.x + size.width, y: position.y + size.height / 2};
    }
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
