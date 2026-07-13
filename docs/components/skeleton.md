---
outline: deep

props:
    -   name: variant
        description: The shape of the skeleton.
        type: "'text' | 'circle' | 'rectangle' | 'rounded'"
        optional: true
        default: text

    -   name: width
        description: The width of the skeleton. A number is treated as pixels.
        type: [ string, number ]
        optional: true

    -   name: height
        description: The height of the skeleton. A number is treated as pixels.
        type: [ string, number ]
        optional: true

    -   name: is
        description: The element or component the skeleton renders as.
        type: string
        optional: true
        default: div
---

# Skeleton

A skeleton is an animated placeholder that stands in for content while it is loading. It conveys the rough shape of the upcoming content and reduces the perceived loading time. Compose multiple skeletons to mirror the layout that will replace them. The shimmer animation is automatically replaced by a subtle pulse when the user prefers reduced motion.

::: render
render=../code/components/skeleton/preview.vue
:::

::: tip
For a static empty state with an icon and a message rather than a loading state, use a [Placeholder](./placeholder).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A few lines of text being loaded.
example=../code/components/skeleton/basic.vue
:::

::: example Variants || All available skeleton shapes.
example=../code/components/skeleton/variants.vue
:::

::: example Card || A skeleton mirroring a media card layout.
example=../code/components/skeleton/card.vue
:::

::: example Table || A table renders skeleton rows through its `loading` slot while its data is loading.
example=../code/components/skeleton/table.vue
:::
