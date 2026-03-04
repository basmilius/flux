---
outline: deep

emits:
    -   name: click
        description: Triggered when the context menu item is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the context menu item is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the context menu item is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of menu item.
        type: [ '"button"', '"link"', '"route"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disable the menu item.
        type: boolean
        optional: true

    -   name: icon-leading
        description: The icon at the start of the menu item.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: The icon at the end of the menu item.
        type: FluxIconName
        optional: true

    -   name: is-loading
        description: Shows a loading state within the menu item instead of the icon at the start.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the menu item.
        type: string
        optional: true

    -   name: command
        description: The label of the menu item command.
        type: string
        optional: true

    -   name: command-loading
        description: Enables the loading state of the command.
        type: boolean
        optional: true

    -   name: image-src
        description: An image that shows instead of the before icon.
        type: string
        optional: true

    -   name: is-active
        description: Indicates that the menu item is active.
        type: boolean
        optional: true

    -   name: is-destructive
        description: Indicates that the menu item is a destructive action.
        type: boolean
        optional: true

    -   name: is-highlighted
        description: Indicates that the menu item is highlighted.
        type: boolean
        optional: true

    -   name: is-indented
        description: Indicates that the menu item is indented.
        type: boolean
        optional: true

    -   name: is-selectable
        description: Indicates that the menu item is selectable.
        type: boolean
        optional: true

    -   name: is-selected
        description: Indicates that the menu item is selected. Only works if is-selectable is also enabled.
        type: boolean
        optional: true

    -   name: tabindex
        description: The tabindex of the menu item.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the menu item's type is set to link.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the menu item's type is set to link.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the menu item's type is set to link.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the menu item's type is set to route. This integrates with Vue Router.
        type: To
        optional: true

slots:
    -   name: after
        description: Slot for additional content at the end of the menu item.

    -   name: sub-menu
        description: The content of the sub-menu. When this slot is provided, a chevron icon is shown and the sub-menu opens on hover with prediction cone support.
---

# Context menu item

The context menu item is an extended menu item that supports nested sub-menus. When the `sub-menu` slot is provided, hovering over the item opens the sub-menu pane to the side. A prediction cone algorithm keeps the sub-menu open while the user moves the mouse diagonally towards it.

The prediction cone can be visualized in debug mode by enabling the `is-debug` prop on the parent [FluxContextMenu](./index).

::: render
render=../../../../code/guide/components/context-menu/item/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A context menu item with a nested sub-menu.
example=../../../../code/guide/components/context-menu/item/basic.vue
:::

::: example Prediction cone || Enable debug mode to visualize the prediction cone.
example=../../../../code/guide/components/context-menu/item/debug.vue
:::

## Used components

- [Menu item](../menu/item)
