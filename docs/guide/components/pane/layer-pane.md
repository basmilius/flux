---
outline: deep

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
render=../../../code/guide/components/layer-pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A layer pane with a secondary header and a single pane.
example=../../../code/guide/components/layer-pane/basic.vue
:::

::: example With footer || Secondary sections can be placed at the top, bottom, or both.
example=../../../code/guide/components/layer-pane/with-footer.vue
:::

::: example With buttons || A layer pane containing action buttons.
example=../../../code/guide/components/layer-pane/with-buttons.vue
:::

::: example With items || A layer pane with a list of items, avatars, and badges.
example=../../../code/guide/components/layer-pane/with-items.vue
:::

::: example Secondary with button || A button inside the secondary section to trigger an action.
example=../../../code/guide/components/layer-pane/with-secondary-button.vue
:::

::: example Secondary with badge || A badge inside the secondary section to show a count.
example=../../../code/guide/components/layer-pane/with-secondary-badge.vue
:::

## Used components

- [Pane](../)
    - [Body](./body)
