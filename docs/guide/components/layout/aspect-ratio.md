---
outline: deep

props:
    -   name: aspect-ratio
        description: The aspect ratio, can be a formula such as "16 / 9".
        type: number

slots:
    -   name: default
        description: The contents of the element.
---

# Aspect ratio

A layout component that ensures content maintains a consistent aspect ratio, providing a reliable way to preserve proportional dimensions across different layouts. It is particularly useful for scenarios like embedding media or designing responsive elements, where maintaining a specific shape is essential for visual harmony and adaptability.

::: render
render=../../../code/guide/components/layout/aspect-ratio/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic aspect ratio.
example=../../../code/guide/components/layout/aspect-ratio/basic.vue
:::
