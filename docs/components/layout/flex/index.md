---
outline: deep

props:
    -   name: align
        description: The alignment of the elements on the cross axis (`align-items`).
        type: '''start'' | ''center'' | ''end'' | ''stretch'' | ''baseline'''
        optional: true

    -   name: direction
        description: The direction in which the elements flow.
        type: '''horizontal'' | ''vertical'''
        optional: true
        default: horizontal

    -   name: gap
        description: The gap between each element in pixels.
        type: number
        optional: true
        default: 0

    -   name: is-inline
        description: If true, the flex container uses `inline-flex` instead of `flex`.
        type: boolean
        optional: true

    -   name: justify
        description: The alignment of the elements on the main axis (`justify-content`).
        type: '''start'' | ''center'' | ''end'' | ''between'' | ''around'' | ''evenly'''
        optional: true

    -   name: tag
        description: The HTML tag to use for the flex container.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

    -   name: wrap
        description: If and how the elements should wrap.
        type: '''wrap'' | ''nowrap'' | ''wrap-reverse'''
        optional: true
        default: nowrap

slots:
    -   name: default
        description: The content of the flex container.
---

# Flex

A primitive layout component that maps directly to CSS flexbox. Use it to compose any flex layout (horizontal or vertical, wrapping or not) with full control over alignment and justification.

::: render
render=../../../code/components/layout/flex/preview.vue
:::

::: tip
For controlling individual children inside a `FluxFlex` container (like making one child grow or shrink), use [`FluxFlexItem`](./item).
:::

<FrontmatterDocs/>

## Available variants

- [Item](./item) (for controlling individual children inside a flex container)

### Stack

Specialised flex containers for stacking specific kinds of content:

- [Action](./action)
- [Badge](./badge)
- [Button](./button)
- [Info](./info)
- [Notice](./notice)
- [Tag](./tag)

## Examples

::: example Horizontal || A horizontal flex container.
example=../../../code/components/layout/flex/horizontal.vue
:::

::: example Vertical || A vertical flex container.
example=../../../code/components/layout/flex/vertical.vue
:::

::: example Align and justify || Combine `align` and `justify` to center content on both axes.
example=../../../code/components/layout/flex/align-justify.vue
:::

::: example Wrapping || Use `wrap` to allow children to flow onto multiple lines.
example=../../../code/components/layout/flex/wrap.vue
:::
