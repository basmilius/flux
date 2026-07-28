# useFlowTrunkLayout

`useFlowTrunkLayout` lays a graph out as a trunk with branches: the nodes you name in `trunk` run straight down, each one centered under the one before it, and everything hanging off one of them is walked out to the right, each level indented past the one before it. Like [`useFlowLayout`](./useFlowLayout) it is a plain function: no component, no DOM and no reactivity.

This is the shape of a rule list rather than of a pipeline. `useFlowLayout` stacks a graph in layers, which puts the second rule's condition beside the first rule's actions; a trunk keeps each rule's own fan-out together and reads top to bottom down the numbered steps.

## Usage

```ts
import { useFlowTrunkLayout } from '@flux-ui/flow';

const {positions, connections} = useFlowTrunkLayout(
    [{id: 'step-1'}, {id: 'check'}],
    [{from: 'step-1', to: 'check'}],
    ['step-1']
);
```

The result is the same shape [`useFlowLayout`](./useFlowLayout) returns, so it binds onto `FluxFlowNode` and `FluxFlowConnection` in exactly the same way.

::: render
render=../../code/flow/composables/useFlowTrunkLayout/preview.vue
:::

::: tip
Pass the size your nodes actually have. The function cannot measure them, and the trunk centers each node under the one above it, so a wrong width shows up as a connector that steps sideways instead of running straight down.
:::

## Options

### x (`0`) and y (`0`)
The top-left corner the trunk starts from.

### indent (`180`)
The x a branch adds per level it hangs off the trunk.

### nodeGap (`45`)
The gap between two nodes stacked underneath each other.

### trunkGap (`60`)
The extra gap before the next node on the trunk, past the branch above it.

### nodeWidth (`300`) and nodeHeight (`90`)
The size assumed for a node that does not carry one.

## Branches

A branch is walked depth first in the order its connectors were written, and every node it reaches takes the next free line, so a rule is as tall as what it does. The next trunk node clears the whole branch above it, which is what keeps two rules from running into each other.

The branch opens on the trunk node's own line, so a rule and its number read as one row rather than as two steps. The node the trunk hands off to is lifted until both ends of that connector sit on the same line, so the connector between them runs dead straight.

A node named in `trunk` that does not exist is skipped, a node reachable from two trunk nodes belongs to the first, and a node nothing reaches is left below everything else instead of piling up on the origin.

## Sides

The sides come with the connections. Down the trunk a connector runs bottom to top; off the trunk it leaves sideways into the branch; and deeper into a branch it drops out of the bottom and comes back in at the left, which is the elbow that makes a rule read as an outline.

## Type declarations

```ts
declare function useFlowTrunkLayout(
    nodes: readonly FluxFlowLayoutNode[],
    edges: readonly FluxFlowLayoutEdge[],
    trunk: readonly string[],
    options?: FluxFlowTrunkLayoutOptions
): FluxFlowLayoutResult;

type FluxFlowTrunkLayoutOptions = {
    readonly x?: number;
    readonly y?: number;
    readonly indent?: number;
    readonly nodeGap?: number;
    readonly trunkGap?: number;
    readonly nodeWidth?: number;
    readonly nodeHeight?: number;
};
```

`FluxFlowLayoutNode`, `FluxFlowLayoutEdge` and `FluxFlowLayoutResult` are documented on [`useFlowLayout`](./useFlowLayout).
