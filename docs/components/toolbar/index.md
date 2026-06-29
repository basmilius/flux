---
outline: deep

props:
    -   name: aria-label
        description: An accessible label for the toolbar, exposed as aria-label on the role="toolbar" container.
        type: string
        optional: true
        default: Toolbar

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

The toolbar renders with `role="toolbar"` and manages a horizontal focus zone: its focusable controls are reachable with the arrow keys as a single tab stop. Provide an `aria-label` to give it a meaningful accessible name.

::: render
render=../../code/components/toolbar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic toolbar.
example=../../code/components/toolbar/basic.vue
:::

::: example Standalone || A standalone text-formatting toolbar with multiple action groups.
example=../../code/components/toolbar/standalone.vue
:::

## Used components

- [Layout](../layout)
    - [Flex](../layout/flex/)
