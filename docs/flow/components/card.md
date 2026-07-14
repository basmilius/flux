---
outline: deep

requiredIcons:
    - bolt
    - code-branch
    - play

props:
    -   name: title
        description: The title shown in the header of the card.
        type: string
        optional: true

    -   name: subtitle
        description: A secondary line shown under the title.
        type: string
        optional: true

    -   name: label
        description: The text of the floating type badge above the card. Without a label the badge is hidden.
        type: string
        optional: true

    -   name: icon
        description: The icon shown in the badge.
        type: FluxIconName
        optional: true

    -   name: color
        description: The color of the badge.
        type: FluxColor
        optional: true

    -   name: active
        description: Highlights the card with an accent border, for example while it runs.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The body of the card. Place text, a FluxFlowCardSection or FluxFlowCardRow components here.

    -   name: footer
        description: The footer of the card, typically a row of FluxTag and FluxBadge chips.
---

# Card

`FluxFlowCard` is the node surface: a floating type badge, a header, a body and an optional footer. It is a plain element, so it renders inside a [Node](./node) or on its own.

::: render
render=../../code/flow/components/card/preview.vue
:::

<FrontmatterDocs/>

## Variants

`FluxFlowTriggerCard`, `FluxFlowConditionCard` and `FluxFlowActionCard` are thin wrappers around `FluxFlowCard` that preset the badge for the three common automation node types. Each default is overridable with the `label`, `icon` and `color` props.

- **`FluxFlowTriggerCard`** — badge "Trigger", icon `bolt`, color `info`.
- **`FluxFlowConditionCard`** — badge "Condition", icon `code-branch`, color `warning`.
- **`FluxFlowActionCard`** — badge "Action", icon `play`, color `primary`.

::: example Variants || The three node variants. Override `label`, `icon` and `color` to fit your own node types.
example=../../code/flow/components/card/variants.vue
:::

::: example Colors || The badge accepts any FluxColor, so you can style a card for any kind of node.
example=../../code/flow/components/card/colors.vue
:::

## Sections and rows

Two helpers structure a card's body. `FluxFlowCardSection` is a labeled box, useful for a prompt or a block of configuration. `FluxFlowCardRow` is a label/value row with an optional dashed `leader`, useful for compact key/value data.

::: example Sections and rows || A card combining a labeled section with several leader rows.
example=../../code/flow/components/card/section-row.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
