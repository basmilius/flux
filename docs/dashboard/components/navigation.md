---
outline: deep

props:
    -   name: logo-location
        description: The route of the logo.
        type: FluxTo
        optional: true

slots:
    -   name: default
        description: The. navigation items.

    -   name: logo
        description: The content of the navigation logo.

requiredIcons:
    - bars
    - ellipsis-h
---

# Dashboard navigation

The dashboard navigation component provides the main navigation area of the dashboard. It typically contains links or icons that allow users to switch between different sections or views. The navigation can be collapsed or expanded, ensuring a clean and flexible layout that adapts to the available space.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/dashboard/navigation/snippet.vue [DashboardNavigation.vue]

:::

## Custom

To collapse the navigation, you will need to create a component that will handle the logic of the collapse and navigation.

::: code-group

<<< @/code/dashboard/navigation/custom/snippet.vue [FluxDashboard.vue]

<<< @/code/dashboard/navigation/custom/navigation.vue [Navigation.vue]

:::

## Used components

- [Menu](../../guide/components/menu)
    - [Item](../../guide/components/menu/item)
