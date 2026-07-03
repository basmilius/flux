---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected tab changes.
        type: [ number ]

props:
    -   name: is-pills
        description: If the tab bar should be rendered as pills.
        type: boolean
        optional: true

    -   name: model-value
        description: The index of the active tab.
        type: number
        optional: true
        default: 0

slots:
    -   name: default
        description: The content of the all the tabs.

    -   name: tabs
        description: The content of the tab bar.
        type:
            activate: '(index: number): void'
            children: VNode[]
            modelValue: number
            tabs: '{ icon?: FluxIconName; label?: string }[]'

    -   name: content
        description: The content of the tabs.
        type:
            activate: '(index: number): void'
            children: VNode[]
            modelValue: number
            tabs: '{ icon?: FluxIconName; label?: string }[]'
---

# Tabs

The tabs component organizes content into separate views, showing one at a time. Each tab switches to its matching content area, keeping related content grouped without crowding the interface.

::: render
render=../../code/components/tabs/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tabs pane.
example=../../code/components/tabs/basic.vue
:::

::: example Icons || A tabs pane with only icons.
example=../../code/components/tabs/icons.vue
:::

::: example Icon and label || A tabs pane with both icons and labels.
example=../../code/components/tabs/icon-label.vue
:::

::: example Pills || A tabs pane with the tab bar rendered as pills.
example=../../code/components/tabs/pills.vue
:::

::: example Pills with icons || A pills tabs pane with only icons.
example=../../code/components/tabs/pills-icons.vue
:::

::: example Pills with icon and label || A pills tabs pane with both icons and labels.
example=../../code/components/tabs/pills-icon-label.vue
:::

## Used components

- [Tab bar](../tab-bar)
    - [Item](../tab-bar/item)
