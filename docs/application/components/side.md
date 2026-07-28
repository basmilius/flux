---
outline: deep

props:
    -   name: close-label
        description: The accessible name of the scrim that closes the panel on narrow viewports. Left unset it is translated through `flux.application.closePanel`.
        type: string
        default: Close panel
        optional: true

    -   name: is-visible
        description: Whether the panel is shown. Bind it with v-model so the scrim can close the panel itself.
        type: boolean
        default: true
        optional: true

slots:
    -   name: default
        description: The content of the side panel.
---

# Application side

The application side renders an `<aside>` panel on the right-hand side of the application. Use it for secondary information that complements the current view, for example a chat, a context panel, or a help drawer. Place it inside the `side` slot of [Application](./application).

::: warning
It has to be the `side` slot. The shell reserves the panel's width with a direct child selector, so a panel rendered anywhere else ends up fixed on top of the content instead of beside it.
:::

::: tip Toggling
Drive it with `v-model:is-visible` rather than `v-if`. The panel stays mounted and slides away, so it travels over the same duration as the padding the shell gives back, and a hidden panel is `inert` and out of the tab order. A visitor who prefers reduced motion gets both changes without the slide.
:::

::: tip Narrow viewports
Below `lg` there is no room for a 300px column beside the content, so the panel stops pushing and starts covering, the same move the menu makes at its own breakpoint. It gets a scrim, and tapping that closes the panel, which is why the state is a model rather than a plain prop.
:::

::: tip Accessibility
The panel renders as an `<aside>` landmark, so assistive technology lists it among the page's regions. Pass an `aria-label` to give it a distinct, meaningful name when the page has more than one complementary region.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/side/snippet.vue [FluxApplicationSide.vue]

:::
