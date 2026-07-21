# useFlowLayout

`useFlowLayout` turns a graph into a drawing. Hand it your nodes and edges and it returns a position per node id plus the connections between them, ready to bind to `FluxFlowNode` and `FluxFlowConnection`. Where a [Chain](../components/chain) places a run of steps in a line, this places a graph that branches and comes back together.

It is a plain function: no component, no DOM and no reactivity. Nodes are laid out in layers, every node lands one layer past its furthest source, and every layer is centred against the widest one, so a straight stretch of the graph stays straight.

## Usage

```ts
import { useFlowLayout } from '@flux-ui/flow';

const {positions, connections} = useFlowLayout(
    [{id: 'intake'}, {id: 'verify'}, {id: 'score'}],
    [{from: 'intake', to: 'verify'}, {from: 'verify', to: 'score'}]
);

// positions:   { intake: {x: 0, y: 0}, verify: {x: 0, y: 150}, … }
// connections: [{from: 'intake', to: 'verify', fromSide: 'bottom', toSide: 'top'}, …]
```

Both are meant to be spread straight onto the components:

```vue
<FluxFlowNode
    v-for="node of nodes"
    :key="node.id"
    :id="node.id"
    v-bind="positions[node.id]">
    <FluxFlowActionCard :title="node.title"/>
</FluxFlowNode>

<FluxFlowConnection
    v-for="wire of connections"
    :key="`${wire.from} ${wire.to}`"
    v-bind="wire"/>
```

::: render
render=../../code/flow/composables/useFlowLayout/preview.vue
:::

::: tip
The function runs without a DOM, so it cannot measure a card. Nodes without a `width` and `height` of their own fall back to `nodeWidth` and `nodeHeight`; pass the size your cards actually have to keep the gaps even.
:::

::: tip
The sides come with the connections, so you never name them yourself. Binding a bare `from` and `to` instead leaves each connector picking the shortest axis between the two cards, and in a layer wider than it is deep that is the wrong one. Setting [`axis`](../components/flow) on the surrounding `FluxFlow` fixes that for hand placed nodes too.
:::

## Example

::: example Left to right || A release pipeline laid out with `direction: 'horizontal'`. The retry edge closes a cycle, which the layout cuts open instead of following, so the run still lands in four layers.
example=../../code/flow/composables/useFlowLayout/horizontal.vue
:::

## Options

### direction (`'vertical'`)
The axis the layers stack on. `vertical` runs top to bottom, `horizontal` runs left to right.

### layerGap (`60`)
The space, in pixels, between two layers.

### nodeGap (`45`)
The space, in pixels, between two nodes inside one layer.

### nodeWidth (`300`) and nodeHeight (`90`)
The size assumed for a node that does not carry one, since the function runs without a DOM.

### x (`0`) and y (`0`)
The top-left corner the layout starts from.

## Cycles

Only directed acyclic graphs lay out in layers, but a graph that loops back on itself is not an error here. An edge that would close a cycle is cut rather than followed, so a retry or a rollback still produces a usable layout instead of an empty one.

A cut edge runs against the flow, and its connection says so: it leaves and enters on the off axis, looping around the diagram instead of cutting back across it. You do not have to work out which edge that was.

Edges to a node that was never given, and edges from a node to itself, are dropped. They are missing from `connections` too, so iterating over it never leaves a connector pointing at nothing.

## Type declarations

```ts
type FluxFlowLayoutNode = {
    readonly id: string;
    readonly width?: number;
    readonly height?: number;
};

type FluxFlowLayoutEdge = {
    readonly from: string;
    readonly to: string;
};

type FluxFlowLayoutOptions = {
    readonly x?: number;
    readonly y?: number;
    readonly direction?: 'horizontal' | 'vertical';
    readonly layerGap?: number;
    readonly nodeGap?: number;
    readonly nodeWidth?: number;
    readonly nodeHeight?: number;
};

type FluxFlowLayoutConnection = {
    readonly from: string;
    readonly to: string;
    readonly fromSide: 'top' | 'right' | 'bottom' | 'left';
    readonly toSide: 'top' | 'right' | 'bottom' | 'left';
};

type FluxFlowLayoutResult = {
    readonly positions: Record<string, { readonly x: number; readonly y: number }>;
    readonly connections: readonly FluxFlowLayoutConnection[];
};

declare function useFlowLayout(
    nodes: readonly FluxFlowLayoutNode[],
    edges: readonly FluxFlowLayoutEdge[],
    options?: FluxFlowLayoutOptions
): FluxFlowLayoutResult;
```
