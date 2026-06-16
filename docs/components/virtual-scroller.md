---
outline: deep

props:
    -   name: estimated-item-height
        description: The fixed height of each item in pixels, used to position the window.
        type: number
        optional: true
        default: 40

    -   name: items
        description: The full list of items to virtualize.
        type: T[]

    -   name: overscan
        description: The number of extra items rendered above and below the visible window, to reduce flicker while scrolling.
        type: number
        optional: true
        default: 4

slots:
    -   name: default
        description: Renders a single item. Receives the item and its index.
        type:
            item: T
            index: number
---

# Virtual scroller

The Virtual scroller renders only the items currently in view, making it possible to display very long lists — thousands of rows — without the performance cost of rendering every item. It is a fixed-row-height windowing primitive.

::: info Not server pagination
The virtual scroller is for rendering a large list that is already in memory on the client. For server-backed data sets, use the [Data table](./data-table)'s server-side pagination instead.
:::

The scroller fills the height of its parent, so place it inside a container with a constrained height.

::: render
render=../code/components/virtual-scroller/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A virtualized list of 10,000 items.
example=../code/components/virtual-scroller/basic.vue
:::

## Used components

- [Scroller](./layout/scroller)
