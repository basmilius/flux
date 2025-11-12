---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected tab changes.
        type: [ number ]

slots:
    -   name: default
        description: The content of the all the tabs.

    -   name: tabs
        description: The content of the tab bar.
        type:
            activate: '(index: number): void'
            children: VNode[]
            modelValue: number
            tabs: '{
                icon?: FluxIconName;
                label?: string
            }[]'

    -   name: content
        description: The content of the tabs.
        type:
            activate: '(index: number): void'
            children: VNode[]
            modelValue: number
            tabs: '{
                icon?: FluxIconName;
                label?: string
            }[]'
---

# Tabs

Tabs are a user interface element used for organizing and navigating content within an application. It consists of clickable tabs that correspond to different content areas, and a content area that displays relevant content based on the selected tab.

::: render
render=../../../code/guide/components/tabs/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tabs pane.
example=../../../code/guide/components/tabs/basic.vue
:::

::: example Icons || A tabs pane with only icons.
example=../../../code/guide/components/tabs/icons.vue
:::

## Used components

- [Tab bar](../tab-bar)
    - [Item](../tab-bar/item)
