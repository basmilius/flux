---
outline: deep

props:
    -   name: aria-label
        description: An accessible label for the group. When set, the group is exposed with role="group" and this label; otherwise no group role is applied.
        type: string
        optional: true

    -   name: is-condensed
        description: Renders the group in a compact style with reduced padding.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the fields are secondary and are rendered in an alternative style.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The items within to group.
---

# Input group

The input group combines an input field with an additional element, such as a button to create a single, cohesive control. This layout is useful for actions or context directly related to the input.

::: render
render=../../../code/components/form/input/group/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic and simple input group.
example=../../../code/components/form/input/group/basic.vue
:::

::: example Labelled || An accessible group label via `aria-label`; the group only takes `role="group"` when labelled.
example=../../../code/components/form/input/group/labelled.vue
:::
