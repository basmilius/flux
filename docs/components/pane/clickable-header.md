---
outline: deep

props:
    -   name: icon
        description: The icon of the pane header.
        type: FluxIconName
        optional: true

    -   name: title
        description: The title of the pane header.
        type: string
        optional: true

    -   name: sub-title
        description: The subtitle of the pane header.
        type: string
        optional: true

    -   name: disabled
        description: If the header is disabled, blocking interaction and dimming its content.
        type: boolean
        optional: true

    -   name: tabindex
        description: The tabindex of the header, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: type
        description: The rendering type of the header, determining the underlying element (button, link, route or none).
        type: FluxPressableType
        optional: true

    -   name: href
        description: The URL of the header when type is link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled when href is set. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled when href is set. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: The router link target when type is route. This integrates with Vue Router.
        type: FluxTo
        optional: true

emits:
    -   name: click
        description: Triggered when the header is clicked.
        type: [ MouseEvent ]

slots:
    -   name: before
        description: The content to be displayed before the title and icon.

requiredIcons:
    - angle-right
---

# Clickable pane header

The clickable pane header is a pressable variant of the [Pane header](./header). The entire header acts as a button, link or router link depending on the `type` prop, making it ideal for a [Layer pane](./layer-pane) section that navigates to a detail view. A trailing chevron signals that the header is navigable.

::: render
render=../../code/components/pane/clickable-header/preview.vue
:::

::: tip
Because the whole header is a single interactive element, it can't contain interactive elements such as buttons. If you need trailing actions, use the regular [Pane header](./header) instead.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A clickable pane header that acts as a link.
example=../../code/components/pane/clickable-header/basic.vue
:::

::: example Layer pane || A clickable header as the entry point of a layer pane section.
example=../../code/components/pane/clickable-header/layer-pane.vue
:::

::: example Colors || Use the layer pane `color` prop to convey meaning. The header and hover state adapt to the color.
example=../../code/components/pane/clickable-header/colors.vue
:::

::: example With avatar || Place an avatar in the `before` slot to build a profile or account entry point.
example=../../code/components/pane/clickable-header/with-avatar.vue
:::

::: example Disabled || A disabled header blocks interaction and dims its content.
example=../../code/components/pane/clickable-header/disabled.vue
:::

## Used components

- [Icon](../icon)
