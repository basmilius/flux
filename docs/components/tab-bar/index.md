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

The bar is exposed as a `role="tablist"` and is fully keyboard navigable: <kbd>ArrowLeft</kbd>/<kbd>ArrowUp</kbd> and <kbd>ArrowRight</kbd>/<kbd>ArrowDown</kbd> move between tabs (wrapping around the ends), while <kbd>Home</kbd> and <kbd>End</kbd> jump to the first and last tab. Disabled tabs are skipped, and the overflow scroll arrows are hidden from assistive technologies. A single roving tab stop keeps the bar reachable with <kbd>Tab</kbd>: the selected tab is tabbable, or the first enabled tab when none is selected.

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
