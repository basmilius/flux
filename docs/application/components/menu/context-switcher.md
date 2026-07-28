---
outline: deep

requiredIcons:
    - grid-2
---

# Application menu context switcher

The application menu context switcher is a compact row of icons that jumps straight to any level of the menu. The first icon returns to the main menu; every icon after it is one of the pushed [contexts](../../composables/useApplicationInjection), in the order they were pushed, showing the icon that context registered.

It reads its state from [`useApplicationMenu`](../../composables/useApplicationMenu), so it highlights the level that is currently in view and hides itself entirely while there is only one level to show.

::: tip
Place it in the `header` slot of [Application menu](./), above the menu itself. Combined with the [Context stack](./context-stack) it gives the user a way back out of a deep route tree without walking every level in between.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu/context-switcher/snippet.vue [FluxApplicationMenuContextSwitcher.vue]

:::

## Used components

- [Menu](../../../components/menu)
    - [Group](../../../components/menu/group)
    - [Item](../../../components/menu/item)
