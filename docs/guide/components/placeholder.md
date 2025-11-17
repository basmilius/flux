---
outline: deep

emits:
    -   name: click
        description: Triggered when the placeholder is clicked.
        type: [ MouseEvent ]

props:
    -   name: icon
        description: The icon that is used within the placeholder.
        type: FluxIconName
        optional: true

    -   name: is-button
        description: If the placeholder is a button.
        type: boolean
        optional: true

    -   name: message
        description: The message in the placeholder.
        type: string
        optional: true

    -   name: title
        description: The title in the placeholder.
        type: string
        optional: true

    -   name: variant
        description: The variant of the placeholder.
        type: [ '"extended"', '"simple"', '"small"' ]
        optional: true
        default: extended

slots:
    -   name: default
        description: The content of the placeholder.
---

# Placeholder

A placeholder is used for situations where the user should provide content, but it hasn't already. This component will display the steps the user has to take.

::: render
render=../../code/guide/components/placeholder/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic placeholder.
example=../../code/guide/components/placeholder/basic.vue
:::

::: example Clickable || A placeholder that can be clicked.
example=../../code/guide/components/placeholder/clickable.vue
:::

::: example Button || A placeholder with a custom button inside.
example=../../code/guide/components/placeholder/button.vue
:::

## Used components

- [Icon](./icon)
