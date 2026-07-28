---
outline: deep

slots:
    -   name: default
        description: The main menu content, typically a list of `FluxMenuItem` and `FluxMenuGroup` components.

    -   name: context
        description: The slot used to render context menu panels, typically a single `FluxApplicationMenuContextStack`.

    -   name: header
        description: The header of the menu, rendered above all panels (e.g. a logo).

    -   name: footer
        description: The footer of the menu, rendered below all panels (e.g. an account menu item).
---

# Application menu

The application menu is the sidebar of `FluxApplication`. It hosts the main menu and any number of context menu panels that slide in horizontally as the user navigates deeper into the route tree.

The collapsed state of the menu is shared with the rest of the application through [`useApplicationInjection`](../../composables/useApplicationInjection).

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu/snippet.vue [FluxApplicationMenu.vue]

:::

## Used components

- [Menu](../../../components/menu)
- [Transitions](../../../components/transitions)
    - [Fade](../../../components/transitions/fade)
