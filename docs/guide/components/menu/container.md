---
outline: deep

props:
    -   name: is-large
        description: Enables a larger mode for the menu.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the menu.
---

# Menu

This component serves as the base structure for creating menus. It displays its child elements vertically, making it perfect for side navigations or flyout menus. It offers basic accessibility features to ensure better user interaction.

It allows you to easily insert custom content and handles keyboard navigation to enhance functionality. With this component, you can build structured and flexible navigation menus without much hassle.

::: render
render=../../../code/guide/components/menu/container/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic menu that consists of a few items.
example=../../../code/guide/components/menu/container/basic.vue
:::

::: example Pane || Panes have first-class support for menus inside them. Place a menu directly inside a Pane to create a contained menu.
example=../../../code/guide/components/menu/container/pane.vue
:::
