---
outline: deep

requiredIcons:
    - bolt

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
        default: Trigger
        optional: true

    -   name: icon
        description: The icon shown in the header.
        type: FluxIconName
        default: bolt
        optional: true

    -   name: color
        description: The tint of the header icon.
        type: FluxColor
        default: info
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

# Trigger card

`FluxFlowTriggerCard` is a [Card](./card) preset as the node that starts an automation: type "Trigger", a `bolt` icon and the `info` tint. Everything else about it is a card, so the same slots and props apply.

::: render
render=../../code/flow/components/trigger-card/preview.vue
:::

::: tip
The presets are only defaults. Give it a `label`, `icon` and `color` of your own when your trigger deserves its own name, without giving up the shape.
:::

<FrontmatterDocs/>

## Used components

- [Card](./card)
