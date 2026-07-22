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

    -   name: fromPort
        description: The id of a FluxFlowPort inside the source node. The port fixes where along the side the connector leaves, which takes the place of fromAlign. An id that no port answers to falls back to the node's own anchor.
        type: string
        optional: true

    -   name: toPort
        description: The id of a FluxFlowPort inside the target node. The port fixes where along the side the connector enters, which takes the place of toAlign. An id that no port answers to falls back to the node's own anchor.
        type: string
        optional: true

    -   name: waypoints
        description: Points the connector runs through, in flow coordinates, the same space as the x / y of a node.
        type: "{x: number, y: number}[]"
        optional: true

    -   name: type
        description: The shape of the connector.
        type: "'smoothstep' | 'step' | 'bezier' | 'straight'"
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

    -   name: labelPlacement
        description: Where the badge rides on a connector that bends. `center` is halfway along the run, `first-leg` and `last-leg` move it to the leg leaving the source or entering the target. A connector without a bend always keeps its badge in the middle.
        type: "'center' | 'first-leg' | 'last-leg'"
        optional: true
        default: center

    -   name: icon
        description: An icon rendered at the midpoint of the connector, breaking the line. Next to a label it sits in the same badge; on its own it renders standalone on the line, without a badge background.
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

For a branch that belongs to something written inside the node, a [Port](./port) is the sharper tool: `from-port` / `to-port` land the connector on the row that names the outcome.

A connector may also point at the node it left. Give `from` and `to` the same id and it loops out of one side and back into that same side, which is how a retry says it runs the step again. Name both `from-side` and `to-side` and the loop routes around the node from the one to the other instead.

::: render
render=../../code/flow/components/connection/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Types || Four connector shapes: `smoothstep` (the default, orthogonal with rounded corners), `step` (the same route with sharp corners), `bezier` and `straight`.
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

::: example Loop || Point `from` and `to` at the same node and the connector loops out of one side and back into it. It uses the side a connector running against the flow would take, so a retry and a step back read alike; `from-side` moves it elsewhere.
example=../../code/flow/components/connection/loop.vue
:::

::: example Loop between two sides || Name both `from-side` and `to-side` and the loop travels from the one to the other: two adjacent sides turn a corner, two opposite ones wrap the node along the axis they do not use.
example=../../code/flow/components/connection/loop-sides.vue
:::

::: example Alignment || A side is not one point: `from-align` and `to-align` move a connector to the `start` or `end` of the side it uses, which pulls two branches out of the same edge apart. `start` lands on the node's own icon, wherever that sits, so a card and a pill each anchor on their own; `end` mirrors that margin to the far corner. A node too narrow for the margin keeps its connector centered.
example=../../code/flow/components/connection/alignment.vue
:::

::: example Label placement || A badge rides the middle of the connector. On a connector that bends that middle can land on a bend, or on the leg two branches share, so `label-placement` moves it to the leg leaving the source or the leg entering the target instead.
example=../../code/flow/components/connection/label-placement.vue
:::

::: example Icons || An `icon` next to a `label` rides along in the badge. An `icon` on its own drops the badge and stands on the line itself, which keeps a connector that only needs a symbol light. Both break the line the same way, and both follow the connector's `color`.
example=../../code/flow/components/connection/icons.vue
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

## Waypoints

A connector routes itself, which is what you want until it runs straight over the card between its two ends. Give it `waypoints` and it runs through the points you name instead. They are plain flow coordinates, the same space as the `x` / `y` of a node, so a route is written where you can read it off the canvas.

Every shape honours them: `straight` becomes a polyline, `smoothstep` rounds each corner the way it rounds its own, `step` turns those same corners sharply, and `bezier` becomes a single smooth curve through the points. The label rides the middle of the whole route, and both endpoints still leave and reach their node along the side they use.

::: example Three shapes, one detour || The same two waypoints in all three shapes. The endpoints are unaffected: waypoints only shape the run between them, and the label rides the middle of that run.
example=../../code/flow/components/connection/waypoints.vue
:::

::: tip
The canvas sizes itself to the nodes it holds, not to the connectors. Keep waypoints inside that area, or give the [Flow](./flow) enough `padding` to cover the detour.
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Port](./port)
