---
outline: deep

props:
    -   name: item-size
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

expose:
    -   name: scrollToIndex
        description: Scroll the viewport so the item at the given index is positioned at the top. Accepts an optional `ScrollBehavior` (defaults to `auto`).
        type: '(index: number, behavior?: ScrollBehavior) => void'
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

::: tip Accessibility
The viewport is exposed as an ARIA `list`, with each visible item as a `listitem`. Because only the windowed items exist in the DOM, the scroller advertises the full list length through `aria-rowcount` on the viewport and `aria-setsize` / `aria-posinset` on each item, so assistive technology reports the true position within the complete list rather than just the rendered window.
:::

::: tip Programmatic scrolling
Hold a template ref to the scroller and call `scrollToIndex(index, behavior?)` to jump to a specific item. The index is clamped to the list bounds, and `behavior` accepts the standard `ScrollBehavior` values (`'auto'` by default, or `'smooth'` for an animated scroll).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A virtualized list of 10,000 items.
example=../code/components/virtual-scroller/basic.vue
:::

::: example Scroll to index || Jump to any item programmatically with the exposed `scrollToIndex` method.
example=../code/components/virtual-scroller/scroll-to-index.vue
:::

## Used components

- [Scroller](./layout/scroller)
