---
outline: deep

props:
    -   name: is-loading
        description: If the pane is in a loading state.
        type: boolean
        optional: true

    -   name: tag
        description: A tag that is shown in the top-right corner of the pane.
        type: string
        optional: true

    -   name: variant
        description: The variant of the pane.
        type: [ '"default"', '"flat"', '"well"' ]
        optional: true
        default: default

    -   name: type
        description: The interaction type of the clickable pane.
        type: FluxPressableType
        optional: true

    -   name: tabindex
        description: The tabindex of the pane, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true

slots:
    -   name: default
        description: The content of the pane.

    -   name: loader
        description: A custom loader to show while is-loading is active.
---

# Clickable pane

A clickable pane is a pressable variant of the [Pane](./index) component. It can act as a button, a link, or a router link, making it suitable for navigable card-style UI elements.

::: render
render=../../code/components/pane/clickable/preview.vue
:::

::: tip
This component is best used within a [Pane group](./group).
:::

<FrontmatterDocs/>

## Examples

::: example As link || A clickable pane that opens an external URL in a new tab.
example=../../code/components/pane/clickable/with-link.vue
:::

## Used components

- [Spinner](../spinner)
