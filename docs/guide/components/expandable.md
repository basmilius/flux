---
outline: deep

emits:
    -   name: toggle
        description: Triggered when the expandable is being opened or closed.
        type: [ boolean ]

props:
    -   name: icon
        description: The icon of the expandable header.
        type: IconName
        optional: true

    -   name: is-opened
        description: The state of the expandable.
        type: boolean
        optional: true

    -   name: label
        description: The label of the expandable header.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the expandable.

    -   name: header
        description: A custom header for the expandable.
        type:
            label: string
            isOpen: boolean
            close: "(): void"
            open: "(): void"
            toggle: "(): void"

    -   name: body
        description: A custom body for the expandable.
        type:
            label: string
            close: "(): void"

requiredIcons:
    - minus
    - plus
---

# Expandable

This component provides a toggleable container for additional content. It consists of a header with a label and a body that holds the expandable content. When the header button is clicked, the body opens or closes to reveal or hide the content.

::: render
render=../../code/guide/components/expandable/preview.vue
:::

::: tip
Multiple expandables can be grouped together using [Expandable Groups](./expandable-group).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || The most basic form of an expandable.
example=../../code/guide/components/expandable/basic.vue
:::

::: example Pane || Expandables work great with panes.
example=../../code/guide/components/expandable/pane.vue
:::

::: example Custom || The header of an expandable can be overwritten with a slot called header. That slot is provided with an isOpen boolean and three functions to control the expandable.
example=../../code/guide/components/expandable/custom.vue
:::

## Used components

- [Icon](./icon)
