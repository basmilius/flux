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

A tab represents a single selectable option within a tabs interface. Each tab is labeled to indicate the content it corresponds to, and selecting it updates the view to display the associated content area.

::: render
render=../../../code/guide/components/tabs/tab/preview.vue
:::

::: warning
This component should be used within [Tabs](../tabs). The icon and label prop are not rendered without this component.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tab.
example=../../../code/guide/components/tabs/tab/basic.vue
:::
