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
    - ellipsis-h
---

# Pagination

A component that displays the pages for paginated content. The component automatically decides which pages to show or not.

::: render
render=../../../code/guide/components/pagination/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic pagination.
example=../../../code/guide/components/pagination/basic.vue
:::

::: example Compact || A compact pagination.
example=../../../code/guide/components/pagination/compact.vue
:::

## Used components

- [Icon](../icon)
