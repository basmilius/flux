---
outline: deep

props:
    -   name: id
        description: The name of the port. A connector points at it with from-port or to-port.
        type: string

    -   name: side
        description: The edge of the node a connector using this port lands on. Without one the port takes the edge it sits closest to.
        type: "'top' | 'right' | 'bottom' | 'left'"
        optional: true
---

# Port

`FluxFlowPort` marks a named point inside a [Node](./node). Put one next to the row it belongs to and reference it from a connector with `from-port` or `to-port`: the connector lands on the node's edge at the height of that row, instead of on the node's icon.

That turns a condition card into a real branching point. Every outcome gets its own row and its own port, so the two branches leave the card where their outcome is written rather than both leaving from the same corner.

A port renders nothing and takes no space of its own: it is a zero sized marker riding the middle of the row it sits in, so adding one never moves the content around it. Only the connector shows where it is.

::: render
render=../../code/flow/components/port/preview.vue
:::

::: tip
The port fixes where along the side the connector lands, `side` fixes which edge. A connector that names a port therefore ignores `from-align` / `to-align`, and a `from-port` that no port answers to falls back to the node's own anchor.
:::

<FrontmatterDocs/>

## Examples

::: example Named branches || Every outcome of a condition gets a row and a port, so each branch leaves the card at its own answer.
example=../../code/flow/components/port/branches.vue
:::

::: example Sides || Leave `side` out and the port takes the edge it sits closest to, which is the right one for a port at the end of a row. Name a `side` for the rest, for example a port in a footer that should leave through the bottom of the card.
example=../../code/flow/components/port/sides.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Connection](./connection)
