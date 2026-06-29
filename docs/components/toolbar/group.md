---
outline: deep

slots:
    -   name: default
        description: The content of the toolbar group.
---

# Toolbar group

The toolbar group component organizes multiple action elements within a toolbar, grouping them together into a clear and cohesive section. It helps maintain visual structure and makes related controls easier to recognize and use.

The group renders with `role="group"`. Provide an `aria-label` to give the grouped controls an accessible name.

::: render
render=../../code/components/toolbar/group/preview.vue
:::

::: tip
The toolbar group component basically serves as a horizontal [Flex](../layout/flex/).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic toolbar.
example=../../code/components/toolbar/group/basic.vue
:::

## Used components

- [Layout](../layout)
    - [Flex](../layout/flex/)
