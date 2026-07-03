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

The window displays one of several slots at a time, letting users move between them. Use it for filters and submenus that do not need to be visible all at once.

::: render
render=../code/components/window/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic window.
example=../code/components/window/basic.vue
:::
