---
outline: deep

props:
    -   name: layout
        description: The layout mode used to constrain the width and padding of the content area.
        type: FluxApplicationLayout
        optional: true
        default: 'default'

slots:
    -   name: default
        description: The content of the application.
---

# Application content

The application content component is the main `<main>` region of the application. It accepts a `layout` prop that controls the maximum width and spacing of the content. The selected layout is also published back into the `FluxApplication` injection, so other components such as [Application top](./top) can adjust their tab bar width to match.

The available layouts are `default`, `dashboard`, `full`, `medium` and `narrow`.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/content/snippet.vue [FluxApplicationContent.vue]

:::
