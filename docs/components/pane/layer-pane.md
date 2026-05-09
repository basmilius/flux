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

components:
    -   name: FluxLayerPaneSecondary
        slots:
            -   name: default
                description: The content of the secondary section.
---

# Layer pane

A layer pane groups related content in a structured panel. Secondary sections provide a contrasting gray header or footer around the primary content.

::: render
render=../../code/components/layer-pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A layer pane with a secondary header and a single pane.
example=../../code/components/layer-pane/basic.vue
:::

::: example Colors || Use the `color` prop to convey meaning, such as severity or status.
example=../../code/components/layer-pane/colors.vue
:::

::: example With footer || Secondary sections can be placed at the top, bottom, or both.
example=../../code/components/layer-pane/with-footer.vue
:::

::: example With buttons || A layer pane containing action buttons.
example=../../code/components/layer-pane/with-buttons.vue
:::

::: example With items || A layer pane with a list of items, avatars, and badges.
example=../../code/components/layer-pane/with-items.vue
:::

::: example Secondary with button || A button inside the secondary section to trigger an action.
example=../../code/components/layer-pane/with-secondary-button.vue
:::

::: example Secondary with badge || A badge inside the secondary section to show a count.
example=../../code/components/layer-pane/with-secondary-badge.vue
:::

::: example With pane header || Use a [Pane header](./header) instead of a secondary section when you need a prominent title with an icon and optional subtitle.
example=../../code/components/layer-pane/with-pane-header.vue
:::

## Used components

- [Pane](../)
    - [Body](./body)
    - [Header](./header)
