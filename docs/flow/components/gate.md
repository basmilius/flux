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

::: example One branch only || An `xor` gate splits a payment into the two routes it can take. The branches leave through the top and bottom points of the diamond, so neither line has to share a corner with the other. Dropping the marker on the line that arrives keeps the diamond the only shape at that point.
example=../../code/flow/components/gate/flow.vue
:::

::: example Any one of them || An `or` gate lets three conditions feed the same action. Two of them land on the top and bottom points and the third runs straight into the left one, so the gate takes three lines without any of them crossing.
example=../../code/flow/components/gate/any-of.vue
:::

::: example Gates in sequence || Both conditions have to hold before an order ships, and only then does the shipping method split in two. A gate can hand off to another gate directly, with no card in between.
example=../../code/flow/components/gate/chained.vue
:::

::: example Without a tint || Left without a `color`, the diamond is drawn in the same gray as a plain connector. Use it when the gate is only wiring and the steps around it carry the emphasis.
example=../../code/flow/components/gate/plain.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Card](./card)
- [Connection](./connection)
- [Pill](./pill)
