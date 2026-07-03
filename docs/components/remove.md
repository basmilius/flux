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

requiredIcons:
    - xmark
---

# Remove

The remove component renders a small button with an X icon to remove an item from a larger set with a single click.

::: render
render=../code/components/remove/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic component remover.
example=../code/components/remove/basic.vue
:::

## Used components

- [Icon](./icon)
