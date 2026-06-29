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

    -   name: label
        description: An accessible label for the menu, applied as aria-label on the menu element. Use it to name the menu for screen readers when there is no visible heading.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the menu.
---

# Menu

This component serves as the base structure for creating menus. It displays its child elements vertically, making it perfect for side navigations or flyout menus. It offers basic accessibility features to ensure better user interaction.

It allows you to easily insert custom content and handles keyboard navigation to enhance functionality. With this component, you can build structured and flexible navigation menus without much hassle.

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
