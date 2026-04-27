---
outline: deep

slots:
    -   name: default
        description: The content of the side panel.
---

# Application side

The application side renders an `<aside>` panel on the right-hand side of the application. Use it for secondary information that complements the current view — for example a chat, a context panel, or a help drawer. Place it inside the `side` slot of [Application](./application).

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/side/snippet.vue [FluxApplicationSide.vue]

:::
