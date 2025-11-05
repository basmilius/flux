---
outline: deep

props:
    -   name: is-loading
        description: If the pane is in a loading state.
        type: boolean
        optional: true

    -   name: tag
        description: The tag of the pane.
        type: string
        optional: true

    -   name: variant
        description: The variant of the pane.
        type: [ '"default"', '"flat"', '"well"' ]
        optional: true
        default: default

slots:
    -   name: default
        description: The content of the pane.

    -   name: loader
        description: The loader of the pane.
---

# Pane

A pane component is a container used to display content in a visually distinct section of a user interface. It serves as a way to separate and organize information. A pane is built with other Pane elements that each have their own purpose.

::: render
render=../../../code/guide/components/pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic pane.
example=../../../code/guide/components/pane/basic.vue
:::

::: example Loading || A pane with a loading state.
example=../../../code/guide/components/pane/loading.vue
:::

::: example Tag || A pane with a tag.
example=../../../code/guide/components/pane/tag.vue
:::

## Used components

- [Spinner](../spinner)
