---
outline: deep

requiredIcons:
    - play

props:
    -   name: title
        description: The title shown in the header of the card. Without one the card falls back to the name of its type.
        type: string
        optional: true

    -   name: subtitle
        description: A secondary line shown under the title.
        type: string
        optional: true

    -   name: label
        description: The name of the card's type, used as the header text when no title is given.
        type: string
        default: Action
        optional: true

    -   name: icon
        description: The icon shown in the header.
        type: FluxIconName
        default: play
        optional: true

    -   name: color
        description: The tint of the header icon.
        type: FluxColor
        default: primary
        optional: true

    -   name: active
        description: Highlights the card with an accent border, for example while it runs.
        type: boolean
        optional: true

    -   name: isLoading
        description: Replaces the header icon with a spinner in the same tinted tile, for a step that is currently running.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The body of the card.

    -   name: footer
        description: The footer of the card, typically a row of FluxTag and FluxBadge chips.

    -   name: header
        description: The trailing end of the header, beside the title.
---

# Action card

`FluxFlowActionCard` is a [Card](./card) preset as the node that does the work: type "Action", a `play` icon and the `primary` tint. Everything else about it is a card, so the same slots and props apply.

::: render
render=../../code/flow/components/action-card/preview.vue
:::

::: tip
Set `isLoading` while the action runs and `active` once it is the step in focus, so a running flow reads without moving anything on the canvas.
:::

<FrontmatterDocs/>

## Used components

- [Card](./card)
