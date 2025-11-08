---
outline: deep

props:
    -   name: floating-mode
        description: The placement of the toolbar.
        type: [ '"free"', '"top-start"', '"top-end"', '"bottom-start"', '"bottom-end"' ]
        optional: true

slots:
    -   name: default
        description: The toolbar content.
---

# Toolbar

The toolbar component is used for actions within a certain context. For example, when you have a stack of products, toolbars can be used to display actions for each product. A toolbar can have groups, buttons and separators within them.

::: render
render=../../../code/guide/components/toolbar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic toolbar.
example=../../../code/guide/components/toolbar/basic.vue
:::

## Used components

- [Layout](../layout)
    - [Stack](../layout/stack)
