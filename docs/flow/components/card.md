---
outline: deep

requiredIcons:
    - bolt
    - circle-dot
    - code-branch
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
        optional: true

    -   name: icon
        description: The icon shown in the header. A card always renders one; each variant brings its own default.
        type: FluxIconName
        optional: true

    -   name: color
        description: The tint of the header icon.
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

`FluxFlowCard` is the node surface: a header carrying the type icon and title, a body and an optional footer. It is a plain element, so it renders inside a [Node](./node) or on its own.

A card always shows an icon, so every node on the canvas reads as a type at a glance. Each variant brings its own icon, tint and type name; `icon`, `color` and `label` override them.

::: render
render=../../code/flow/components/card/preview.vue
:::

<FrontmatterDocs/>

## Variants

`FluxFlowTriggerCard`, `FluxFlowConditionCard` and `FluxFlowActionCard` are thin wrappers around `FluxFlowCard` that preset the three common automation node types. Each default is overridable with the `label`, `icon` and `color` props.

- **`FluxFlowTriggerCard`** — type "Trigger", icon `bolt`, color `info`.
- **`FluxFlowConditionCard`** — type "Condition", icon `code-branch`, color `warning`.
- **`FluxFlowActionCard`** — type "Action", icon `play`, color `primary`.

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
