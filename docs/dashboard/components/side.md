---
outline: deep

props:
    -   name: title
        description: The title of the dashboard side.
        type: string

slots:
    -   name: top-bar-start
        description: The content before the dashboard side header.

    -   name: top-bar-end
        description: The content after the dashboard side header.

    -   name: default
        description: The content of the dashboard side.
---

# Dashboard side

The dashboard side component provides space for supplementary content or tools, such as filters, summaries, or additional actions. Positioned alongside the main content, it helps users interact with supporting features without disrupting their primary workflow.

<FrontmatterDocs/>

## Snippet

::: code-group



:::

## Used components

- [Layout](../../guide/components/layout)
    - [Spacer](../../guide/components/layout/spacer)
