---
outline: deep

props:
    -   name: icon
        description: The icon shown inside the addition.
        type: FluxIconName
        optional: true

    -   name: label
        description: The label shown inside the addition.
        type: string
        optional: true

slots:
    -   name: default
        description: Custom content for the addition.
---

# Input addition

The input addition is a small element placed visually inside a form input — typically used to display a unit, currency symbol, or icon. It can be placed before or after the input when combined with an [Input group](./group).

::: render
render=../../../code/components/form/input/addition/preview.vue
:::

::: tip
This component is best used within an [Input group](./group).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/form/input/addition/preview.vue [FluxFormInputAddition.vue]

:::

## Used components

- [Icon](../../icon)
