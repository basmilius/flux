---
outline: deep

props:
    -   name: icon
        description: The icon to display.
        type: FluxIconName

slots:
    -   name: default
        description: The content to display.
---

# Info

The info component is used to display short, informative messages that provide additional context or guidance to the user.

::: render
render=../code/components/info/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic info display.
example=../code/components/info/basic.vue
:::

::: example Multiple || Multiple info's to display.
example=../code/components/info/multiple.vue
:::

## Used components

- [Icon](./icon)
