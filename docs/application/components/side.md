---
outline: deep

slots:
    -   name: default
        description: The content of the side panel.
---

# Application side

The application side renders an `<aside>` panel on the right-hand side of the application. Use it for secondary information that complements the current view, for example a chat, a context panel, or a help drawer. Place it inside the `side` slot of [Application](./application).

::: tip Accessibility
The panel renders as an `<aside>` landmark, so assistive technology lists it among the page's regions. Pass an `aria-label` to give it a distinct, meaningful name when the page has more than one complementary region.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/side/snippet.vue [FluxApplicationSide.vue]

:::
