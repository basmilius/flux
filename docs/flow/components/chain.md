---
outline: deep

props:
    -   name: x
        description: The horizontal position the chain starts at, in flow coordinates.
        type: number
        optional: true
        default: 0

    -   name: y
        description: The vertical position the chain starts at, in flow coordinates.
        type: number
        optional: true
        default: 0

    -   name: gap
        description: The space, in pixels, between two links.
        type: number
        optional: true
        default: 60

    -   name: labelGap
        description: The space between two links whose connector carries a label or an icon, since a badge needs more room than the plain gap leaves. Defaults to 105 on a vertical chain and 210 on a horizontal one, and never drops below `gap`.
        type: number
        optional: true

    -   name: direction
        description: The axis the links run on. `vertical` stacks them top to bottom, `horizontal` from left to right.
        type: "'horizontal' | 'vertical'"
        optional: true
        default: vertical

    -   name: align
        description: How links of different sizes line up across the run. `center` puts their middles on one line, which is what keeps the connectors straight.
        type: "'start' | 'center' | 'end'"
        optional: true
        default: center

    -   name: autoConnect
        description: Draws a connector between every two neighbouring links. Turn it off to wire the chain up yourself.
        type: boolean
        optional: true
        default: true

slots:
    -   name: default
        description: The links of the chain. Place FluxFlowNode components here, plus any FluxFlowConnection that should replace an automatic one.
---

# Chain

`FluxFlowChain` positions a run of nodes and wires them together. Give it a starting point and it hands every [Node](./node) inside it a position, so a straight sequence of steps no longer needs a coordinate per card.

A link keeps its own `id`, so connectors from outside the chain reference it exactly as they always have.

::: render
render=../../code/flow/components/chain/preview.vue
:::

::: tip
Absolute `x` and `y` on a node stay the source of truth for positions. A chain only fills them in for the nodes it holds; give a node its own `x` and `y` and it keeps them, stepping out of the layout while staying in the markup.
:::

<FrontmatterDocs/>

## Examples

::: example Mixed sizes || A terminal, a pill and a card are all different widths. With `align="center"` their middles land on one line, so the connectors run dead straight through the whole run.
example=../../code/flow/components/chain/mixed.vue
:::

::: example Horizontal || Set `direction="horizontal"` to run the chain from left to right. Links line up on their middles across the run, the same way they do vertically.
example=../../code/flow/components/chain/horizontal.vue
:::

::: example Your own connector || A `FluxFlowConnection` written between two links replaces the automatic one, so a labelled or colored connector never doubles up with a plain one. A side branch stays outside the chain and references the link by id.
example=../../code/flow/components/chain/branch.vue
:::

::: example Labelled connectors || A connector that carries a label or an icon gets a wider segment, so the badge sits clear of both cards with a stretch of line on either side. Tune it with `label-gap` when your labels run long.
example=../../code/flow/components/chain/labelled.vue
:::

::: tip
A chain only claims the pairs it can see: a connector between two links has to sit inside the chain, in the same direction, to replace the automatic one. Set `:auto-connect="false"` to draw every connector yourself.
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Connection](./connection)
- [Card](./card)

## See also

- [useFlowLayout](../composables/useFlowLayout) for a graph that branches instead of running in a line.
