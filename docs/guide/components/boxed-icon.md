---
outline: deep

emits:
    -   name: click
        description: Triggered when the icon is clicked.
        type: [ MouseEvent ]

props:
    -   name: name
        description: The name of the icon to use.
        type: FluxIconName
        
    -   name: size
        description: The size of the icon.
        type: [ number, string ]
        optional: true
---

# Boxed icon

This component displays a single customizable Font Awesome icon, rendered as SVG in a box.

::: render
render=../../code/guide/components/boxed-icon/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Standalone
example=../../code/guide/components/boxed-icon/standalone.vue
:::

::: example Pane
example=../../code/guide/components/boxed-icon/pane.vue
:::

## Used components

- [Icon](./icon)
