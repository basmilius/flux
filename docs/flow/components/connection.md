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

    -   name: fromAlign
        description: Where along its side the connector leaves the source node. `start` lands on the node's own icon, `end` mirrors it.
        type: "'start' | 'center' | 'end'"
        optional: true
        default: center

    -   name: toAlign
        description: Where along its side the connector enters the target node. `start` lands on the node's own icon, `end` mirrors it.
        type: "'start' | 'center' | 'end'"
        optional: true
        default: center

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

    -   name: animated
        description: Travels the dashes or dots along the line, towards the target. Only affects a dashed or dotted connector.
        type: boolean
        optional: true

    -   name: markerStart
        description: What the connector renders where it leaves the source node.
        type: "'arrow' | 'bar' | 'chevron' | 'diamond' | 'dot' | 'square' | 'none'"
        optional: true
        default: dot

    -   name: markerEnd
        description: What the connector renders where it reaches the target node.
        type: "'arrow' | 'bar' | 'chevron' | 'diamond' | 'dot' | 'square' | 'none'"
        optional: true
        default: chevron

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

By default the connector picks the most natural pair of sides based on where the nodes sit: stacked nodes connect bottom to top, side by side nodes connect right to left. Override `from-side` / `to-side` when you need an explicit route, for example the two branches out of a condition. Both branches then leave the same edge in the same spot; `from-align` / `to-align` move either end to the start or the end of its side to pull them apart, aligned on the icon of the node they touch.

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

::: example Alignment || A side is not one point: `from-align` and `to-align` move a connector to the `start` or `end` of the side it uses, which pulls two branches out of the same edge apart. `start` lands on the node's own icon, wherever that sits, so a card and a pill each anchor on their own; `end` mirrors that margin to the far corner. A node too narrow for the margin keeps its connector centered.
example=../../code/flow/components/connection/alignment.vue
:::

::: example Line styles || Connectors are solid by default; set `dashed` or `dotted` for other styles. A connector leaves its source with a port dot and reaches its target with an arrow head; `marker-start` and `marker-end` swap either for the other shape, or drop it entirely.
example=../../code/flow/components/connection/dashed.vue
:::

::: example Animated || Add `animated` to a dashed or dotted connector to travel its pattern towards the target, which reads as work in flight. It respects reduced motion.
example=../../code/flow/components/connection/animated.vue
:::

::: example Markers || Both ends carry their own marker. Give a two-way connector a head on each end, or strip them both for a bare line.
example=../../code/flow/components/connection/markers.vue
:::

::: example Marker shapes || Six shapes to end a connector with. `chevron` and `arrow` point at the target; `dot`, `diamond` and `square` read as ports; `bar` caps the line off.
example=../../code/flow/components/connection/marker-shapes.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
