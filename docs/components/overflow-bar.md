---
outline: deep

props:
    -   name: alignment
        description: The alignment of the visible items.
        type: FluxAlignment
        optional: true
        default: center

    -   name: direction
        description: The direction of the overflow bar.
        type: FluxDirection
        optional: true
        default: horizontal

    -   name: gap
        description: The gap in pixels between items.
        type: number
        optional: true
        default: 9

slots:
    -   name: default
        description: The items to display. Items that do not fit are hidden and passed to the overflow slot.

    -   name: overflow
        description: Content rendered when items overflow. Receives the hidden items as a prop.
        type:
            items: VNode[]
---

# Overflow bar

The overflow bar is a layout component that shows as many of its child items as possible within the available space. Items that do not fit are hidden and passed to the `overflow` slot, where you can render them in a flyout or dropdown. This is particularly useful in toolbars and filter bars.

::: render
render=../code/components/overflow-bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example With flyout || Hidden items can be revealed in a flyout menu through the `overflow` slot.
example=../code/components/overflow-bar/with-flyout.vue
:::

## Used components

- [Dynamic view](./dynamic-view)
