---
outline: deep

props:
    -   name: icon
        description: The icon of the dashboard menu.
        type: FluxIconName
        optional: true

    -   name: title
        description: The title of the dashboard menu.
        type: string
        optional: true

slots:
    -   name: top-bar-start
        description: The content before the dashboard menu header.

    -   name: top-bar-end
        description: The content after the dashboard menu header.

    -   name: default
        description: The content of the dashboard menu.
---

# Dashboard menu

The dashboard menu component displays secondary navigation or contextual actions related to the current dashboard section. It complements the main navigation by giving users quick access to tools, filters, or settings that enhance their workflow.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/dashboard/menu/snippet.vue [DashboardMenu.vue]

:::

## Used components

- [Icon](../../guide/components/icon)
- [Layout](../../guide/components/layout)
    - [Spacer](../../guide/components/layout/spacer)
