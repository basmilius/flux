---
outline: deep

emits:
    -   name: navigate
        description: Triggered when a page change occurred.
        type: [ number ]

props:
    -   name: arrows
        description: If the navigation arrows should be enabled.
        type: boolean
        optional: true

    -   name: is-compact
        description: If the pagination should be compact.
        type: boolean
        optional: true

    -   name: page
        description: The current page.
        type: number

    -   name: per-page
        description: The number of items per page.
        type: number

    -   name: total
        description: The total number of items.
        type: number

requiredIcons:
    - angle-left
    - angle-right
---

# Pagination

A component that displays the pages for paginated content. The component automatically decides which pages to show or not.

::: render
render=../../code/components/pagination/preview.vue
:::

::: info Ellipsis behavior
Hidden pages are collapsed into a non-interactive ellipsis (`…`), which is hidden from assistive technologies via `aria-hidden`. A gap is only collapsed when at least two pages are hidden; a single hidden page is rendered directly, since an ellipsis would take up the same space as the page it replaces. In compact mode the current page button is labelled for screen readers so its purpose stays clear.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic pagination.
example=../../code/components/pagination/basic.vue
:::

::: example Compact || A compact pagination.
example=../../code/components/pagination/compact.vue
:::

## Used components

- [Icon](../icon)
