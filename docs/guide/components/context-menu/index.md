---
outline: deep

expose:
    -   name: close
        description: Closes the context menu.
        type: "(): void"

    -   name: open
        description: Opens the context menu at the given coordinates.
        type: "(x: number, y: number): void"

props:
    -   name: is-debug
        description: Enables a visual prediction cone overlay for debugging sub-menu behaviour.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The element the context menu is attached to.

    -   name: menu
        description: The menu content shown inside the context menu pane.
        type:
            close: "(): void"
---

# Context menu

A context menu component that opens on right-click at the cursor position. It renders an accessible modal pane at the exact position where the user clicked, and provides a `close` function to dismiss it from within the menu content.

Context menus can contain any standard [menu](../menu/) components, and can be extended with [`FluxContextMenuSubMenu`](./sub-menu) items for nested navigation.

::: render
render=../../../code/guide/components/context-menu/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic context menu with copy, cut, paste and delete actions.
example=../../../code/guide/components/context-menu/basic.vue
:::

::: example Sub-menus || Context menus support nested sub-menus using the FluxContextMenuSubMenu component.
example=../../../code/guide/components/context-menu/sub-menu.vue
:::

::: example Prediction cone debug || Enable the `is-debug` prop to visualize the prediction cone used for sub-menu navigation. The cone represents the safe zone where the cursor can move toward a sub-menu without it closing.
example=../../../code/guide/components/context-menu/debug.vue
:::

## Used components

- [Menu](../menu/)
- [Pane](../pane/)
