---
outline: deep

props:
    -   name: is-pills
        description: If the tab bar should be rendered as pills.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the tab bar.
---

# Tab bar

The tab bar displays a row of navigation tabs, allowing users to switch between different sections or views within the interface. It groups multiple tab items together in a single bar and provides a consistent, easy-to-scan structure for navigating related content areas.

::: render
render=../../code/components/tab-bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tab bar.
example=../../code/components/tab-bar/basic.vue
:::

::: example Icon and label || A tab bar with both icons and labels.
example=../../code/components/tab-bar/icon-label.vue
:::

::: example Pane || A tab bar inside a pane.
example=../../code/components/tab-bar/pane.vue
:::

::: example Pills || A tab bar rendered as pills.
example=../../code/components/tab-bar/pills.vue
:::

::: example Pills with icon and label || A pills tab bar with both icons and labels.
example=../../code/components/tab-bar/pills-icon-label.vue
:::

::: example Pills in pane || A pills tab bar inside a pane.
example=../../code/components/tab-bar/pills-pane.vue
:::

## Used components

- [Icon](../icon)
