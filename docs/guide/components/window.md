---
outline: deep

slots:
    -   name: default
        description: The primary view of the window.
        type:
            back: '(to?: string): void'
            navigate: '(to?: string): void'

    -   name: '[key: string]'
        description: A slot for additional views.
        type:
            back: '(to?: string): void'
            navigate: '(to?: string): void'
---

# Window

The window component is a user interface component that allows users to navigate through multiple slots, displaying one slot at a time. They are commonly used for presenting filters and submenus that may not need to be visible immediately. With windows, users can interact with various options without cluttering the primary interface, creating a seamless user experience.

::: render
render=../../code/guide/components/window/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic window.
example=../../code/guide/components/window/basic.vue
:::
