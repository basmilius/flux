---
outline: deep

emits:
    -   name: toggle
        description: Triggered when the expandable pane is being opened or closed.
        type: [ boolean ]

props:
    -   name: color
        description: The color of the layer pane.
        type: FluxColor
        optional: true
        default: gray

    -   name: icon
        description: The icon of the pane header.
        type: FluxIconName
        optional: true

    -   name: is-opened
        description: The state of the expandable pane.
        type: boolean
        optional: true

    -   name: subtitle
        description: The subtitle of the pane header.
        type: string
        optional: true

    -   name: title
        description: The title of the pane header.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the expandable pane, rendered within a pane body.

    -   name: before
        description: Content rendered before the icon within the pane header.

    -   name: header
        description: A custom header for the expandable pane.
        type:
            contentId: string
            headerId: string
            subtitle: string
            title: string
            isOpen: boolean
            close: "(): void"
            open: "(): void"
            toggle: "(): void"

    -   name: body
        description: A custom body for the expandable pane, replacing the pane body.
        type:
            contentId: string
            headerId: string
            subtitle: string
            title: string
            close: "(): void"

expose:
    -   name: contentId
        description: The id of the expandable content, referenced by the header through aria-controls.

    -   name: headerId
        description: The id of the expandable header.

    -   name: isOpen
        description: Whether the expandable pane is currently open.

    -   name: close
        description: Closes the expandable pane.

    -   name: open
        description: Opens the expandable pane.

    -   name: toggle
        description: Toggles the expandable pane.

requiredIcons:
    - angle-right
---

# Expandable pane

This component is a pane shaped variant of the [Expandable](../expandable). It renders a [Layer pane](../pane/layer-pane) with a clickable [Pane header](../pane/header) as its disclosure button, and reveals a nested [Pane](../pane) holding the content.

::: render
render=../../code/components/expandable-pane/preview.vue
:::

::: tip
Expandable panes participate in an [Expandable group](./group), so they can be mixed with regular expandables to make sure only one of them is open at any moment.
:::

::: tip
The header is a real button with `aria-controls` and `aria-expanded` wired to the body region. When you provide a custom `header` slot, use the `headerId` and `contentId` slot props (also available on the `body` slot) to recreate this relationship on your own trigger element.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || The most basic form of an expandable pane.
example=../../code/components/expandable-pane/basic.vue
:::

::: example Colors || The color prop is forwarded to the layer pane.
example=../../code/components/expandable-pane/colors.vue
:::

::: example Group || Expandable panes within a group close each other.
example=../../code/components/expandable-pane/group.vue
:::

## Used components

- [Icon](../icon)
- [Layer pane](../pane/layer-pane)
- [Pane](../pane)
- [Pane body](../pane/body)
