---
outline: deep

emits:
    -   name: click
        description: Triggered when the badge is clicked.
        type: [ MouseEvent ]

    -   name: delete
        description: Triggered when the delete button is clicked.
        type: [ ]

props:
    -   name: color
        description: The color of the badge.
        type: FluxColorVariant
        optional: true

    -   name: dot
        description: Shows a dot instead of an icon at the start of the badge.
        type: boolean
        optional: true

    -   name: icon
        description: The icon that is used in the badge.
        type: FluxIconName
        optional: true

    -   name: is-clickable
        description: Indicates that the badge is clickable.
        type: boolean
        optional: true

    -   name: is-deletable
        description: Indicates that the badge is deletable.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading state within the badge instead of the icon or dot.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the badge.
        type: string

requiredIcons:
    - xmark
---

# Badge

The Badge component serves as a label for specific elements in the UI. It can be used, for example, to display the status of an order or highlight important information.

::: render
render=../../code/guide/components/badge/preview.vue
:::

::: tip
Flux also has [Tags](./tag), which look similar to badges.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple badge can deliver additional insights about an entity.
example=../../code/guide/components/badge/basic.vue
:::

::: example Dot || A dot badge is useful for indicating statuses, for instance, the status of a server.
example=../../code/guide/components/badge/dot.vue
:::

::: example Icon || Including icons in badges can improve their clarity, for instance, indicating an app's release status.
example=../../code/guide/components/badge/icon.vue
:::

::: example Loading || A loading state badge can signify that a table row is processing, for instance, retrieving data.
example=../../code/guide/components/badge/loading.vue
:::

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
