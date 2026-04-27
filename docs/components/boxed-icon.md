---
outline: deep

props:
    -   name: name
        description: The name of the icon to use.
        type: FluxIconName

    -   name: color
        description: The color used for the box.
        type: FluxColor
        optional: true

    -   name: size
        description: The size of the icon.
        type: number
        optional: true
---

# Boxed icon

This component displays a single customizable Font Awesome icon, rendered as SVG in a box.

::: render
render=../code/components/boxed-icon/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Standalone
example=../code/components/boxed-icon/standalone.vue
:::

::: example Pane
example=../code/components/boxed-icon/pane.vue
:::

## Used components

- [Icon](./icon)
