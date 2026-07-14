---
outline: deep

props:
    -   name: from
        description: The id of the source node.
        type: string

    -   name: to
        description: The id of the target node.
        type: string

    -   name: fromSide
        description: The side of the source node the connector leaves from. Defaults to the most natural side based on the relative position of the nodes.
        type: "'top' | 'right' | 'bottom' | 'left'"
        optional: true

    -   name: toSide
        description: The side of the target node the connector enters. Defaults to the most natural side based on the relative position of the nodes.
        type: "'top' | 'right' | 'bottom' | 'left'"
        optional: true

    -   name: type
        description: The shape of the connector.
        type: "'smoothstep' | 'bezier' | 'straight'"
        optional: true
        default: smoothstep

    -   name: color
        description: The color of the base line. Accepts a FluxColor or any CSS color.
        type: FluxColor | string
        optional: true

    -   name: label
        description: A label rendered in a badge at the midpoint of the connector.
        type: string
        optional: true

    -   name: icon
        description: An icon rendered in a badge at the midpoint of the connector, breaking the line. Combines with a label.
        type: FluxIconName
        optional: true

    -   name: dashed
        description: Draws the base line dashed instead of solid.
        type: boolean
        optional: true

    -   name: dotted
        description: Draws the base line dotted instead of solid.
        type: boolean
        optional: true

    -   name: markers
        description: Which endpoint port circles to show. Markers are on by default; opt out per side.
        type: "'both' | 'from' | 'to' | 'none'"
        optional: true
        default: both

    -   name: progressColor
        description: The color of the progress overlay. Accepts a FluxColor or any CSS color.
        type: FluxColor | string
        optional: true
        default: primary

    -   name: progressValue
        description: How much of the connector is filled with the progress color, from 0 to 1. Set it to visualize a running flow.
        type: number
        optional: true
---

# Connection

`FluxFlowConnection` draws a line between two nodes. It references them by `from` and `to`, resolves their positions from the flow, and routes a path between the nearest edges. Because connectors are declared separately from the nodes, all of a flow's wiring lives in one place.

By default the connector picks the most natural pair of sides based on where the nodes sit: stacked nodes connect bottom to top, side by side nodes connect right to left. Override `from-side` / `to-side` when you need an explicit route, for example the two branches out of a condition.

::: render
render=../../code/flow/components/connection/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Types || Three connector shapes: `smoothstep` (the default, orthogonal with rounded corners), `bezier` and `straight`.
example=../../code/flow/components/connection/types.vue
:::

::: example Progress || A connector with a `progress-value` fills from the source towards the target, which is useful for visualizing a running flow. The fill animates as the value changes and respects reduced motion.
example=../../code/flow/components/connection/progress.vue
:::

::: example Colors || Give a connector a `color`, a FluxColor or any CSS color, to categorize it.
example=../../code/flow/components/connection/colors.vue
:::

::: example Explicit sides || Override `from-side` and `to-side` to route a connector out of a specific edge, for example the two branches of a condition.
example=../../code/flow/components/connection/sides.vue
:::

::: example Line styles || Connectors are solid by default; set `dashed` or `dotted` for other styles. Every connector shows port markers at its endpoints, which you can opt out of per side with `markers`.
example=../../code/flow/components/connection/dashed.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
