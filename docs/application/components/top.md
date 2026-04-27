---
outline: deep

props:
    -   name: icon
        description: An icon shown next to the title.
        type: FluxIconName
        optional: true

    -   name: title
        description: The title shown at the top of the application.
        type: string
        optional: true

slots:
    -   name: start
        description: Content rendered at the start of the top bar, after the menu toggle.

    -   name: end
        description: Content rendered at the end of the top bar.

    -   name: tabs
        description: A `FluxTabBar` rendered below the top bar — typically a list of `FluxTabBarItem` components linking to the views of the current page.
---

# Application top

The application top is the sticky header of the application. It hosts the menu toggle, an optional icon and title, and two slots — `start` and `end` — for additional content. When the user scrolls, the top bar gains a subtle elevation so it visually separates from the content below.

The component also exposes a `tabs` slot. When provided, a `FluxTabBar` is rendered below the title so the user can switch between the views of the current page. The tab bar width follows the layout published by [Application content](./content).

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/top/snippet.vue [FluxApplicationTop.vue]

:::

## Used components

- [Application menu toggle](./menu-toggle)
- [Icon](../../components/icon)
- [Layout](../../components/layout)
    - [Spacer](../../components/layout/spacer)
- [Tab bar](../../components/tab-bar)
- [Transitions](../../components/transitions/fade)
    - [Fade](../../components/transitions/fade)
    - [Route](../../components/transitions/route)
