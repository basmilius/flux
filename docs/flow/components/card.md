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
        description: The body of the card. Place plain text or any Flux component here, for example a FluxDescriptionList for compact key/value data.

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

## Rich content

The card body is a plain vertical stack, so you are not limited to text. Drop in any component from Flux or Flux Statistics: a [`FluxDescriptionList`](../../components/description-list/) for compact key/value data, a `FluxStatisticsLegend` for a color coded breakdown, a chart, badges, anything you need.

::: example Rich content || A card mixing plain text, a FluxDescriptionList and a FluxStatisticsLegend.
example=../../code/flow/components/card/content.vue
:::

## Interactive content

Nothing about the body is read only. Because it is plain markup, interactive controls, buttons and animated values work exactly as they would anywhere else, so a card can double as a small control surface for its node.

::: example Toggle || A FluxToggle drives the node's state; the badge and accent border follow it.
example=../../code/flow/components/card/toggle.vue
:::

::: example Approval || A FluxAvatar identifies the reviewer and a FluxSecondaryButton in the footer resolves the step.
example=../../code/flow/components/card/approval.vue
:::

::: example Live progress || A FluxStatisticsMeter reflects a running job by animating its value while the card stays active.
example=../../code/flow/components/card/progress.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
