import type { FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';
import { alignOffset, FALLBACK_INSET } from '~flux/flow/util';
import type { FluxFlowLayoutConnection, FluxFlowLayoutEdge, FluxFlowLayoutNode, FluxFlowLayoutResult } from './useFlowLayout';

export type FluxFlowTrunkLayoutOptions = {
    /** The top-left corner the trunk starts from. */
    readonly x?: number;
    readonly y?: number;
    /** The x a branch adds per level it hangs off the trunk. */
    readonly indent?: number;
    /** The gap between two nodes stacked underneath each other. */
    readonly nodeGap?: number;
    /** The extra gap before the next node on the trunk, past the branch above it. */
    readonly trunkGap?: number;
    readonly nodeWidth?: number;
    readonly nodeHeight?: number;
};

/**
 * Lays a graph out as a trunk with branches: the nodes named in `trunk` run
 * straight down, each one centred under the one before it, and everything
 * hanging off one of them is walked out to the right, each level indented past
 * the one before it. It is a plain function: no component, no DOM and no
 * reactivity.
 *
 * This is the shape of a rule list rather than of a pipeline. `useFlowLayout`
 * stacks a graph in layers, which puts the second rule's condition beside the
 * first rule's actions; a trunk keeps each rule's own fan-out together and reads
 * top to bottom down the numbered steps.
 *
 * A branch is walked depth first in the order its connectors were written, and
 * every node it reaches takes the next free line, so a rule is as tall as what
 * it does. The next trunk node clears the whole branch above it, which is what
 * keeps two rules from running into each other.
 *
 * A node named in `trunk` that does not exist is skipped, a node reachable from
 * two trunk nodes belongs to the first, and a node nothing reaches is left at
 * the origin.
 *
 * ```ts
 * const {positions} = useFlowTrunkLayout(
 *     [{id: 'step-1'}, {id: 'check'}],
 *     [{from: 'step-1', to: 'check'}],
 *     ['step-1']
 * );
 * ```
 */
export default function useFlowTrunkLayout(nodes: readonly FluxFlowLayoutNode[], edges: readonly FluxFlowLayoutEdge[], trunk: readonly string[], options: FluxFlowTrunkLayoutOptions = {}): FluxFlowLayoutResult {
    const {
        x = 0,
        y = 0,
        indent = 180,
        nodeGap = 45,
        trunkGap = 60,
        nodeWidth = 300,
        nodeHeight = 90
    } = options;

    const known = new Set(nodes.map(node => node.id));
    const sizes = new Map(nodes.map(node => [node.id, {width: node.width ?? nodeWidth, height: node.height ?? nodeHeight}]));
    const anchors = new Map(nodes.map(node => [node.id, node.anchor ?? null]));

    /**
     * How far down a node a connector attaches, on the two ends of the run out
     * of the trunk into a branch: a trunk node hands the line off centred, and
     * the branch takes it in on its anchor. Lining those two up is what keeps
     * the connector between them straight.
     */
    const handOff = (id: string): number => sizes.get(id)!.height / 2;
    const takeIn = (id: string): number => alignOffset(sizes.get(id)!.height, 'start', anchors.get(id)?.y ?? FALLBACK_INSET);
    const spine = trunk.filter(id => known.has(id));
    const onSpine = new Set(spine);

    const links = edges.filter(edge => edge.from !== edge.to && known.has(edge.from) && known.has(edge.to));
    const outgoing = new Map<string, string[]>(nodes.map(node => [node.id, []]));

    for (const edge of links) {
        outgoing.get(edge.from)!.push(edge.to);
    }

    const positions: Record<string, FluxFlowPosition> = {};
    const depths = new Map<string, number>();
    const placed = new Set<string>();

    /**
     * Places `id` on the line at `top` and everything below it, and hands back
     * the first line left free underneath.
     */
    function walk(id: string, depth: number, top: number): number {
        positions[id] = {x: x + indent * depth, y: top};
        depths.set(id, depth);
        placed.add(id);

        let next = top + sizes.get(id)!.height + nodeGap;

        for (const child of outgoing.get(id)!) {
            if (!onSpine.has(child) && !placed.has(child)) {
                next = walk(child, depth + 1, next);
            }
        }

        return next;
    }

    let cursor = y;
    let previous: { readonly x: number; readonly width: number } | null = null;

    for (const id of spine) {
        const size = sizes.get(id)!;

        // Each trunk node hangs centred under the one it came from, so a 30px
        // step marker sits under the middle of the pill above it rather than
        // against the left edge of the column and the line between them runs
        // straight down. The branches keep their own columns.
        const trunkX = previous ? previous.x + (previous.width - size.width) / 2 : x;

        positions[id] = {x: trunkX, y: cursor};
        depths.set(id, 0);
        placed.add(id);
        previous = {x: trunkX, width: size.width};

        // The branch opens on the trunk node's own line, so a rule and its
        // number read as one row rather than as two steps.
        let branch = cursor;
        let opening = true;

        for (const child of outgoing.get(id)!) {
            if (onSpine.has(child) || placed.has(child)) {
                continue;
            }

            if (opening) {
                // Lift the node the trunk hands off to until the two ends of
                // that connector sit on the same line, so it runs dead straight
                // instead of stepping down into the card.
                branch = cursor + handOff(id) - takeIn(child);
                opening = false;
            }

            branch = walk(child, 1, branch);
        }

        cursor = Math.max(cursor + size.height + nodeGap, branch) - nodeGap + trunkGap;
    }

    // Anything the trunk never reached still needs a position, or it would pile
    // up on the origin unannounced.
    for (const node of nodes) {
        if (!placed.has(node.id)) {
            positions[node.id] = {x, y: cursor};
            depths.set(node.id, 0);
            cursor += sizes.get(node.id)!.height + nodeGap;
        }
    }

    const connections = links.map(edge => ({from: edge.from, to: edge.to, ...sidesOf(edge, onSpine, depths)}));

    return {positions, connections};
}

/**
 * The sides that suit an edge in a trunk. Down the trunk itself a connector runs
 * bottom to top; off the trunk it leaves sideways into the branch; and inside a
 * branch it drops out of the bottom and comes back in at the left, which is the
 * elbow that makes a rule read as an outline.
 */
function sidesOf(edge: FluxFlowLayoutEdge, onSpine: ReadonlySet<string>, depths: ReadonlyMap<string, number>): Pick<FluxFlowLayoutConnection, 'fromSide' | 'toSide'> {
    const from: FluxFlowSide = 'bottom';

    if (onSpine.has(edge.from) && onSpine.has(edge.to)) {
        return {fromSide: from, toSide: 'top'};
    }

    if (onSpine.has(edge.from)) {
        return {fromSide: 'right', toSide: 'left'};
    }

    // Deeper into the branch, or back out of it: either way the line leaves
    // downwards and lands on the side of what it points at.
    return {fromSide: from, toSide: (depths.get(edge.to) ?? 0) > (depths.get(edge.from) ?? 0) ? 'left' : 'top'};
}
