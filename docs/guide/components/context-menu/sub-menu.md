---
outline: deep

props:
    -   name: disabled
        description: Disables the sub-menu trigger item.
        type: boolean
        optional: true

    -   name: icon-leading
        description: The icon shown at the start of the sub-menu trigger item.
        type: FluxIconName
        optional: true

    -   name: is-destructive
        description: Indicates that the sub-menu trigger represents a destructive action.
        type: boolean
        optional: true

    -   name: label
        description: The label of the sub-menu trigger item.
        type: string
        optional: true

    -   name: tabindex
        description: The tabindex of the sub-menu trigger item.
        type: [ string, number ]
        optional: true

slots:
    -   name: default
        description: The content of the sub-menu pane, typically a FluxMenu with FluxMenuGroup and FluxMenuItem components.
---

# Context menu sub-menu

A sub-menu item that can be placed inside a `FluxContextMenu`. When the user hovers over the trigger, a nested menu pane appears to the side. The component implements a **prediction cone** to keep the sub-menu open while the cursor travels toward it.

The prediction cone is a triangular safe zone drawn from the current cursor position to the near corners of the sub-menu pane. As long as the mouse movement stays inside this cone, the sub-menu remains open. This prevents accidental closures when moving diagonally toward a sub-menu. The cone can be visualized by enabling `is-debug` on the parent `FluxContextMenu`.

::: render
render=../../../code/guide/components/context-menu/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Sub-menus || Use FluxContextMenuSubMenu inside a context menu to create nested navigation.
example=../../../code/guide/components/context-menu/sub-menu.vue
:::

::: example Prediction cone debug || Enable debug mode on the parent context menu to see the prediction cone rendered in real-time.
example=../../../code/guide/components/context-menu/debug.vue
:::

## Used components

- [Menu item](../item)
