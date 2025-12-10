---
outline: deep

props:
    -   name: icon
        description: The icon of the dashboard header.
        type: FluxIconName
        optional: true

    -   name: title
        description: The title of the dashboard header.
        type: string
        optional: true

slots:
    -   name: start
        description: The content before the dashboard header.

    -   name: end
        description: The content after the dashboard header.
---

# Dashboard header

The dashboard header component appears at the top of the dashboard content area. It displays the page title along with an optional icon, providing a clear visual identifier for the current section. The header helps maintain consistency across dashboard views and gives users immediate context about where they are within the interface.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/dashboard/header/snippet.vue [DashboardHeader.vue]

:::

## Used components

- [Icon](../../guide/components/icon)
- [Layout](../../guide/components/layout)
    - [Spacer](../../guide/components/layout/spacer)
