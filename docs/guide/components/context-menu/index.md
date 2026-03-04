---
outline: deep

props:
    -   name: is-debug
        description: When enabled, draws the prediction cone on screen to help debug sub-menu hover behavior.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The element that the context menu is attached to. Right-clicking this element opens the context menu.
        type:
            close: "(): void"

    -   name: menu
        description: The content of the context menu. Use FluxMenu, FluxMenuGroup, FluxMenuItem and FluxContextMenuItem here.
        type:
            close: "(): void"

expose:
    -   name: close
        description: Closes the context menu.
        type: "(): void"

    -   name: open
        description: Programmatically opens the context menu at the given viewport coordinates.
        type: "(x: number, y: number): void"
---

# Context menu

The context menu component wraps any element and shows a contextual menu when the user right-clicks (or long-presses on touch devices). It supports sub-menus through [FluxContextMenuItem](./item) and includes a prediction cone algorithm that allows users to move diagonally from a menu item to its sub-menu without accidentally closing it.

::: render
render=../../../code/guide/components/context-menu/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic context menu with a few actions.
example=../../../code/guide/components/context-menu/basic.vue
:::

::: example Sub menu || Context menus support nested sub-menus via FluxContextMenuItem.
example=../../../code/guide/components/context-menu/sub-menu.vue
:::

::: example Multiple sub menus || Multiple FluxContextMenuItem components can be used in a single context menu.
example=../../../code/guide/components/context-menu/multiple-sub-menus.vue
:::

## Used components

- [Menu](../menu)
- [Pane](../pane)
