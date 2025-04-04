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

# Menu title

This component is used to display a title within a menu. The title is highlighted, enhancing the visual structure of the menu by clearly indicating different sections or overall context. This simple yet effective component ensures that users can easily identify the purpose or category of the menu items that follow.

::: render
render=../../../code/guide/components/menu/title/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Section
example=../../../code/guide/components/menu/title/section.vue
:::
