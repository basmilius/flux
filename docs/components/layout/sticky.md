---
outline: deep

props:
    -   name: has-shadow-on-stick
        description: Apply a shadow when the sticky element is in its stuck state.
        type: boolean
        optional: true

    -   name: offset
        description: The distance in pixels from the sticky edge.
        type: number
        optional: true
        default: 0

    -   name: position
        description: Which edge to stick to.
        type: '''top'' | ''bottom'''
        optional: true
        default: top

    -   name: tag
        description: The HTML tag to use for the sticky element.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

slots:
    -   name: default
        description: 'The sticky content. Receives `{ isStuck: boolean }` as a slot prop so children can adapt to the stuck state.'
---

# Sticky

A wrapper that applies `position: sticky` and tracks when the element is actually in its stuck state. Use the `isStuck` slot prop to adapt the UI when sticky behaviour kicks in (e.g. condense a header, change colors, show shadows).

::: render
render=../../code/components/layout/sticky/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Header || A typical sticky header with a shadow once it sticks.
example=../../code/components/layout/sticky/header.vue
:::

::: example Bottom || Stick to the bottom edge instead.
example=../../code/components/layout/sticky/bottom.vue
:::

::: example Reactive content || Use the `isStuck` slot prop to adapt children to the stuck state.
example=../../code/components/layout/sticky/with-shadow.vue
:::
