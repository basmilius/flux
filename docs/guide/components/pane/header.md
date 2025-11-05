---
outline: deep

props:
    -   name: icon
        description: The icon of the pane header.
        type: FluxIconName
        optional: true

    -   name: title
        description: The title of the pane header.
        type: string
        optional: true

    -   name: sub-title
        description: The subtitle of the pane header.
        type: string
        optional: true

slots:
    -   name: before
        description: The content to be displayed before the title and icon.

    -   name: after
        description: The content to be displayed after the title and icon.
---

# Pane header

The pane header provides a structured title area for the pane. It supports optional icons and styled text to clearly communicate the purpose of the pane.

::: render
render=../../../code/guide/components/pane/header/preview.vue
:::

<FrontmatterDocs/>

## Examples 

::: example Basic || A basic pane header.
example=../../../code/guide/components/pane/header/basic.vue
:::

::: example Icon || A pane header with an icon.
example=../../../code/guide/components/pane/header/icon.vue
:::

::: example Sub title || A pane header with an sub title.
example=../../../code/guide/components/pane/header/subtitle.vue
:::

## Used components

- [Icon](../icon)
