---
outline: deep

props:
    -   name: is-condensed
        description: ??
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
render=../../../../code/guide/components/form/input/group/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic and simple input group.
example=../../../../code/guide/components/form/input/group/basic.vue
:::
