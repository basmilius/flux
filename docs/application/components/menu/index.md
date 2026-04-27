---
outline: deep

props:
    -   name: show-page-indicator
        description: Whether to show the page indicator dots when the menu has more than one level.
        type: boolean
        optional: true
        default: true

slots:
    -   name: default
        description: The main menu content — typically a list of `FluxMenuItem` and `FluxMenuGroup` components.

    -   name: context
        description: The slot used to render context menu panels — typically a single `FluxApplicationMenuContextStack`.

    -   name: header
        description: The header of the menu, rendered above all panels (e.g. a logo).

    -   name: footer
        description: The footer of the menu, rendered below all panels (e.g. an account menu item).
---

# Application menu

The application menu is the sidebar of `FluxApplication`. It hosts the main menu and any number of context menu panels that slide in horizontally as the user navigates deeper into the route tree. When more than one level is visible, page indicator dots are rendered at the bottom so the user can jump to any level directly.

The collapsed state of the menu is shared with the rest of the application through [`useApplicationInjection`](../../composables/useApplicationInjection).

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu/snippet.vue [FluxApplicationMenu.vue]

:::

## Used components

- [Application menu](./)
    - [Account](./account)
    - [Context](./context)
    - [Context stack](./context-stack)
    - [Promo](./promo)
    - [Toggle](./toggle)
