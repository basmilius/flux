import type { FluxFlowDirection } from '~flux/flow/data';

/**
 * The room a segment needs when its connector carries a badge: a 28px badge
 * plus 6px of cut air, the 9px each end keeps from a node and a visible stretch
 * of line. A horizontal run leaves more, since a badge there is as wide as its
 * text rather than one line high.
 */
export const LABELLED_GAP: Record<FluxFlowDirection, number> = {
    vertical: 105,
    horizontal: 210
};
