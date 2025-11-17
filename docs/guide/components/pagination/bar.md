---
outline: deep

emits:
    -   name: limit
        description: Triggered when the limit is changed.
        type: [ number ]

    -   name: navigate
        description: Triggered when a page change occurred.
        type: [ number ]

props:
    -   name: limits
        description: The different limits that are available.
        type: number[]
        optional: true
        default: [ 5, 10, 25, 50, 100 ]

    -   name: page
        description: The current page.
        type: number

    -   name: per-page
        description: The number of items per page.
        type: number

    -   name: total
        description: The total number of items.
        type: number
---

# Pagination bar

The pagination bar displays information about the current page of data and allows the user to change how many items are shown per page.

::: render
render=../../../code/guide/components/pagination/bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic pagination bar.
example=../../../code/guide/components/pagination/bar/basic.vue
:::

## Used components

- [Pagination](../pagination)
- [Layout](../layout)
    - [Spacer](../layout/spacer)
- [Form](../form)
    - [Select](../form/select)
