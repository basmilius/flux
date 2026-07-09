---
outline: deep

props:
    -   name: color
        description: The color of the layer pane.
        type: FluxColor
        default: gray
        optional: true

slots:
    -   name: default
        description: The content of the layer pane.
---

# Layer pane

A layer pane groups related content in a structured panel. Place a [Pane header](./header) or [Pane footer](./footer) directly inside it to frame the primary content with a contrasting tinted band.

::: render
render=../../code/components/layer-pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A layer pane with a header and a single pane.
example=../../code/components/layer-pane/basic.vue
:::

::: example Colors || Use the `color` prop to convey meaning, such as severity or status.
example=../../code/components/layer-pane/colors.vue
:::

::: example With footer || A header at the top and a footer at the bottom of the layer pane.
example=../../code/components/layer-pane/with-footer.vue
:::

::: example With buttons || A layer pane containing action buttons.
example=../../code/components/layer-pane/with-buttons.vue
:::

::: example With button group || A segmented button group as a view switcher in the pane header.
example=../../code/components/layer-pane/with-button-group.vue
:::

::: example With items || A header with a trailing action, above a list of items with avatars and badges.
example=../../code/components/layer-pane/with-items.vue
:::

::: example With icon || A [Pane header](./header) with an icon for a prominent section heading.
example=../../code/components/layer-pane/with-pane-header.vue
:::

## Used components

- [Pane](../)
    - [Body](./body)
    - [Header](./header)
    - [Footer](./footer)
