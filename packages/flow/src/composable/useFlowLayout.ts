import type { FluxFlowDirection, FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';

export type FluxFlowLayoutNode = {
    readonly id: string;
    /**
     * The measured size of the node. Without one the layout falls back to
     * `nodeWidth` and `nodeHeight`, since it runs without a DOM.
     */
    readonly width?: number;
    readonly height?: number;
};

export type FluxFlowLayoutEdge = {
    readonly from: string;
    readonly to: string;
};

/**
 * One edge, with the sides that suit the layout it was placed in. Spread it
 * straight onto a `FluxFlowConnection`.
 */
export type FluxFlowLayoutConnection = {
    readonly from: string;
    readonly to: string;
    readonly fromSide: FluxFlowSide;
    readonly toSide: FluxFlowSide;
};

export type FluxFlowLayoutResult = {
    readonly positions: Record<string, FluxFlowPosition>;
    readonly connections: readonly FluxFlowLayoutConnection[];
};

export type FluxFlowLayoutOptions = {
    /** The top-left corner the layout starts from. */
    readonly x?: number;
    readonly y?: number;
    /** `vertical` runs top to bottom, `horizontal` runs left to right. */
    readonly direction?: FluxFlowDirection;
    /** The gap between two layers. */
    readonly layerGap?: number;
    /** The gap between two nodes inside one layer. */
    readonly nodeGap?: number;
    readonly nodeWidth?: number;
    readonly nodeHeight?: number;
};

/**
 * Lays out a directed graph in layers and returns a position per node id plus
 * the connections between them, ready to hand to `FluxFlowNode` and
 * `FluxFlowConnection`. It is a plain function: no component, no DOM and no
 * reactivity, so it also runs on the server or in a build step.
 *
 * A node lands one layer past its furthest source, and every layer is centred
 * against the widest one, so a run of single nodes lines up dead straight.
 * Edges to unknown nodes and edges from a node to itself are dropped, and an
 * edge that would close a cycle is cut rather than followed, so a graph that is
 * not a DAG still lays out.
 *
 * Each connection carries the sides that suit the layout. A cut edge runs back
 * against the flow, so it leaves and enters on the off axis and loops around
 * the diagram instead of cutting across it.
 *
 * ```ts
 * const {positions, connections} = useFlowLayout(
 *     [{id: 'trigger'}, {id: 'charge'}],
 *     [{from: 'trigger', to: 'charge'}]
 * );
 * ```
 */
export default function useFlowLayout(nodes: readonly FluxFlowLayoutNode[], edges: readonly FluxFlowLayoutEdge[], options: FluxFlowLayoutOptions = {}): FluxFlowLayoutResult {
    const {
        x = 0,
        y = 0,
        direction = 'vertical',
        layerGap = 60,
        nodeGap = 45,
        nodeWidth = 300,
        nodeHeight = 90
    } = options;

    const isVertical = direction === 'vertical';
    const order = nodes.map(node => node.id);
    const known = new Set(order);
    const links = edges.filter(edge => edge.from !== edge.to && known.has(edge.from) && known.has(edge.to));

    const sizes = new Map(nodes.map(node => [node.id, {width: node.width ?? nodeWidth, height: node.height ?? nodeHeight}]));

    // `across` measures a node along the axis its layer runs on, `along`
    // measures it along the axis the layers stack on.
    const across = (id: string): number => (isVertical ? sizes.get(id)!.width : sizes.get(id)!.height);
    const along = (id: string): number => (isVertical ? sizes.get(id)!.height : sizes.get(id)!.width);

    const {layers, cut} = layerNodes(order, links);
    const extents = layers.map(layer => layer.reduce((total, id, index) => total + across(id) + (index > 0 ? nodeGap : 0), 0));
    const widest = Math.max(0, ...extents);
    const positions: Record<string, FluxFlowPosition> = {};

    let main = 0;

    layers.forEach((layer, index) => {
        let offset = (widest - extents[index]) / 2;

        for (const id of layer) {
            positions[id] = isVertical
                ? {x: x + offset, y: y + main}
                : {x: x + main, y: y + offset};

            offset += across(id) + nodeGap;
        }

        main += Math.max(0, ...layer.map(along)) + layerGap;
    });

    // Along the flow: out of the trailing side into the leading one. Against it:
    // out of and into the same off-axis side, so the line loops around the
    // diagram rather than back through it.
    const [forwardFrom, forwardTo]: readonly [FluxFlowSide, FluxFlowSide] = isVertical ? ['bottom', 'top'] : ['right', 'left'];
    const backSide: FluxFlowSide = isVertical ? 'right' : 'bottom';

    const connections = links.map(edge => (cut.has(edge)
        ? {from: edge.from, to: edge.to, fromSide: backSide, toSide: backSide}
        : {from: edge.from, to: edge.to, fromSide: forwardFrom, toSide: forwardTo}));

    return {positions, connections};
}

/**
 * The node ids grouped per layer, in the order they were given, plus the edges
 * cut to get there: a node sits one layer past its furthest source, and an edge
 * reaching back into the settled layers closes a cycle and is cut.
 */
function layerNodes(order: readonly string[], edges: readonly FluxFlowLayoutEdge[]): { layers: string[][]; cut: Set<FluxFlowLayoutEdge> } {
    const outgoing = new Map<string, FluxFlowLayoutEdge[]>(order.map(id => [id, []]));
    const indegree = new Map<string, number>(order.map(id => [id, 0]));
    const layer = new Map<string, number>(order.map(id => [id, 0]));
    const cut = new Set<FluxFlowLayoutEdge>();

    for (const edge of edges) {
        outgoing.get(edge.from)!.push(edge);
        indegree.set(edge.to, indegree.get(edge.to)! + 1);
    }

    const settled = new Set<string>();
    const queue = order.filter(id => indegree.get(id) === 0);

    while (settled.size < order.length) {
        if (queue.length === 0) {
            // Everything left is caught in a cycle. Release the node closest to
            // being ready and carry on, rather than stalling on it.
            const next = order.filter(id => !settled.has(id)).reduce((best, id) => (indegree.get(id)! < indegree.get(best)! ? id : best));
            indegree.set(next, 0);
            queue.push(next);
        }

        const id = queue.shift()!;

        if (settled.has(id)) {
            continue;
        }

        settled.add(id);

        for (const edge of outgoing.get(id)!) {
            const to = edge.to;

            // An edge back into a layer that is already settled closes a cycle.
            // Cutting it here is what keeps the run finite.
            if (settled.has(to)) {
                cut.add(edge);
                continue;
            }

            layer.set(to, Math.max(layer.get(to)!, layer.get(id)! + 1));
            indegree.set(to, indegree.get(to)! - 1);

            if (indegree.get(to)! <= 0) {
                queue.push(to);
            }
        }
    }

    const grouped = new Map<number, string[]>();

    for (const id of order) {
        const index = layer.get(id)!;
        grouped.set(index, [...(grouped.get(index) ?? []), id]);
    }

    const layers = [...grouped.keys()]
        .sort((a, b) => a - b)
        .map(index => grouped.get(index)!);

    return {layers, cut};
}
