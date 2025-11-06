---
outline: deep

emits:
    -   name: remove
        description: Triggered when the remove button is clicked.
        type: [ MouseEvent ]

props:
    -   name: icon
        description: The icon to use for the remove button.
        type: FluxIconName
        optional: true
        default: xmark

    -   name: is-hidden
        description: If the remove button is hidden.
        type: boolean
        optional: true
---

# Remove

The remove component is a simple and intuitive Vue component that allows users to easily remove other components within a larger system. With a single button and a clear "X" icon, users can quickly and easily remove components with a single click.

::: render
render=../../code/guide/components/remove/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic component remover.
example=../../code/guide/components/remove/basic.vue
:::

## Used components

- [Icon](./icon)
