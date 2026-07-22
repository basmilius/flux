---
outline: deep

props:
    -   name: trunk
        description: The ids that form the trunk, in the order they run down it. Naming them lays the graph out as a trunk with branches instead of in layers, which is the shape of a rule list rather than of a pipeline. Without it the graph stacks in layers and `direction` applies.
        type: string[]
        optional: true

    -   name: direction
        description: The direction the layers stack in. `vertical` runs top to bottom, `horizontal` runs left to right. Ignored by a trunk, which always runs down.
        type: "'horizontal' | 'vertical'"
        optional: true
        default: vertical

    -   name: indent
        description: Trunk only. The x, in pixels, a branch adds per level it hangs off the trunk. Without one the graph leaves 180px, or 210px as soon as any of its connectors carries a label or an icon, since a branch runs sideways and a badge on one needs room across rather than down.
        type: number
        optional: true

    -   name: x
        description: The x coordinate the layout starts from.
        type: number
        optional: true
        default: 0

    -   name: y
        description: The y coordinate the layout starts from.
        type: number
        optional: true
        default: 0

    -   name: layerGap
        description: The gap, in pixels, between two layers, or between a branch and the trunk node below it. Without one the graph leaves 60px, or in layers 105px (210px when horizontal) as soon as any of its connectors carries a label or an icon, since a badge needs room the standard gap does not have.
        type: number
        optional: true

    -   name: nodeGap
        description: The gap, in pixels, between two nodes inside one layer.
        type: number
        optional: true
        default: 45

slots:
    -   name: default
        description: The nodes and connectors of the graph. The connectors are read as the wiring the layout runs on, so the nodes need no coordinates of their own.
---

# Graph

`FluxFlowGraph` places a branching flow for you. It reads the connectors written inside it as the graph they describe, lays the nodes out in layers, and hands each one its position, so a [Node](./node) inside a graph carries no `x` and no `y`.

It is the branching counterpart of a [Chain](./chain): a chain places a straight run, a graph places anything that forks and merges. The layout runs on the sizes the cards measured for themselves, so a 300px card and a pill in the same layer still line up.

Two shapes are on offer. By default the graph stacks in layers, which suits a pipeline: everything at the same depth sits on the same row. Name a `trunk` instead and those ids run straight down a column while everything hanging off them walks out to the right, which suits a numbered rule list, where each rule should stay with its own fan-out rather than share a row with the next rule.

::: render
render=../../code/flow/components/graph/preview.vue
:::

::: tip
Name the axis on the surrounding [Flow](./flow) that matches the graph's `direction`, so every connector runs with the flow instead of taking the shorter way out.
:::

::: tip
A graph reads its connectors before it lays anything out, so it also knows whether any of them carries a badge and leaves the layers further apart when one does, exactly as a [Chain](./chain) does for its run. Set `layer-gap` yourself to take that over.
:::

::: tip
A trunk places the nodes; the connectors are still yours. Give the ones that run sideways into a card a `to-align="start"` so they land on its icon rather than halfway down it, and give a branch a `from-side="bottom"` so it drops out of the card above rather than leaving its right edge and doubling back.
:::

::: tip
A node lands one layer past its furthest source, and every layer is centred against the widest one. An edge that would close a cycle is cut rather than followed, so a graph that is not a tree still lays out; give such a connector its own `from-side` and `to-side` to send it around the diagram.
:::

<FrontmatterDocs/>

## Examples

::: example Horizontal || Set `direction` to `horizontal` to stack the layers left to right, and match it with `axis` on the flow.
example=../../code/flow/components/graph/horizontal.vue
:::

::: example Fanning out and merging || Three checks run off one trigger and come back together on the step that needs all of them. The layer is laid out on what each node actually measures, so pills of three different widths sit evenly spaced and the layers above and below stay centred on them.
example=../../code/flow/components/graph/branches.vue
:::

::: example Running back || A connector that would close a cycle is cut out of the layout rather than followed, so the three steps still stack in order. Give it a `from-side` and a `to-side` on the off axis and it loops around the diagram instead of cutting back across it.
example=../../code/flow/components/graph/cycle.vue
:::

::: example Keeping a node in place || A node that carries its own `x` and `y` is left where it is and takes no part in the layout, which is how an annotation stands beside a flow without pushing a layer aside.
example=../../code/flow/components/graph/pinned.vue
:::

::: example A running pipeline || The [running pipeline](../examples) from the examples, with every coordinate taken out. Each stage still swaps its icon and tint off one clock, spins while it runs and carries a `FluxBadge` naming its state, and the connectors still fill towards the stage they feed; the graph is what decides where the pill and the three cards land. The stages are written with a `v-for`, and the graph reads straight through it.
example=../../code/flow/components/graph/pipeline.vue
:::

::: example Routing rules || The [routing rules](../examples) from the examples, with every coordinate taken out. Naming the trigger and the two steps as the `trunk` runs them straight down a column and walks each rule out to the right, so a rule stays with its own fan-out. Every rule is as tall as what it does, and the next step clears the branch above it.
example=../../code/flow/components/graph/routing.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Connection](./connection)
- [Card](./card)
