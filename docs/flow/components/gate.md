---
outline: deep

props:
    -   name: type
        description: The rule the gate applies to the lines meeting it.
        type: "'and' | 'or' | 'xor'"

    -   name: color
        description: The tint of the diamond. Without one it is drawn in the same gray as a plain connector.
        type: FluxColor
        optional: true
---

# Gate

`FluxFlowGate` is the diamond of a flow: the point where several lines have to agree, or where exactly one of many branches is taken. It says out loud what a [Junction](./junction) leaves implicit, which is why it carries its rule (`and`, `or` or `xor`) in the shape itself.

Place it in its own [Node](./node) and wire it up like any other node. Its four points sit on the sides a connector attaches to, so lines land on the diamond rather than next to it.

::: render
render=../../code/flow/components/gate/preview.vue
:::

::: tip
Reach for a [Junction](./junction) when lines simply come together, and for a gate when the way they come together is part of the flow.
:::

<FrontmatterDocs/>

## Examples

::: example One branch only || An `xor` gate splits a payment into the two routes it can take. Dropping the marker on the line that arrives keeps the diamond the only shape at that point.
example=../../code/flow/components/gate/flow.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Card](./card)
