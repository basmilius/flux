---
outline: deep
---

# Application menu toggle

The application menu toggle is the button that collapses or expands the menu sidebar. It is rendered automatically by [Application top](../top), but you can also place it inside the menu itself — for example as a footer item — to give the user an alternative way to collapse the menu.

The toggle reads its state from [`useApplicationInjection`](../../composables/useApplicationInjection), so it always reflects the current menu state.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu/toggle/snippet.vue [FluxApplicationMenuToggle.vue]

:::

## Used components

- [Menu](../../../components/menu)
    - [Item](../../../components/menu/item)
