---
outline: deep

props:
    -   name: context-menu-name
        description: The named route view that holds the context menu component for each level of the route tree.
        type: string
        optional: true
        default: 'menu'

    -   name: show-desktop-menu-toggle
        description: Whether the menu toggle button is visible on desktop. By default the menu is always shown on desktop.
        type: boolean
        optional: true
        default: false

slots:
    -   name: default
        description: The main content of the application — typically a top bar followed by content.

    -   name: menu
        description: The menu sidebar of the application.

    -   name: side
        description: The right-hand side panel of the application.
---

# Application

The application component provides the overall layout structure for the application interface. It defines regions for the menu sidebar, the main content, and an optional side panel. This component also manages the collapsed state of the menu and the active context level, and shares that state with child components through [`useApplicationInjection`](../composables/useApplicationInjection).

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/snippet.vue [FluxApplication.vue]

:::
