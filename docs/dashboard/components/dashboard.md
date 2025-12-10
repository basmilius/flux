---
outline: deep

slots:
    -   name: default
        description: The content of the dashboard page.

    -   name: header
        description: The header of the dashboard.

    -   name: navigation
        description: The navigation of the dashboard.

    -   name: menu
        description: The side menu of the dashboard.

    -   name: side
        description: The content of the sidebar.
---

# Dashboard

The dashboard component provides the overall layout structure for the dashboard interface. It defines regions for navigation, menu, header, main content, and side content. This component also manages the collapsed state of navigation and menu elements and shares that state with child components.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/dashboard/snippet.vue [FluxDashboard.vue]

:::
