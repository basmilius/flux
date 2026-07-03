---
outline: deep

props:
    -   name: is-large
        description: Enables a larger mode for the menu.
        type: boolean
        optional: true

    -   name: is-persistent
        description: When enabled, clicking any item inside this menu keeps it (or its hosting flyout) open instead of closing it. Defaults to false; individual items can also opt in via their own is-persistent.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the menu.
---

# Menu

The menu is the base structure for building menus. It stacks its child elements vertically, which suits side navigations and flyout menus, and provides basic accessibility features.

Insert custom content freely; the menu handles keyboard navigation for you.

::: render
render=../../code/components/menu/container/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic menu that consists of a few items.
example=../../code/components/menu/container/basic.vue
:::

::: example Pane || Panes have first-class support for menus inside them. Place a menu directly inside a Pane to create a contained menu.
example=../../code/components/menu/container/pane.vue
:::
