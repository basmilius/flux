---
outline: deep

props:
    -   name: icon
        description: The icon of the tab.
        type: FluxIconName
        optional: true

    -   name: label
        description: The label of the tab.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the tab.
---

# Tab

A tab represents a single selectable option within a tabs interface. Each tab is labelled to indicate the content it corresponds to, and selecting it updates the view to display the associated content area.

::: render
render=../../code/components/tabs/tab/preview.vue
:::

::: warning
This component is best used within [Tabs](../tabs). The icon and label props are not rendered without it.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tab.
example=../../code/components/tabs/tab/basic.vue
:::
