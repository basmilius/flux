---
outline: deep

emits:
    -   name: toggle
        description: Triggered when the collapsible opens or closes.
        type: [ boolean ]

    -   name: update:isOpened
        description: Two-way binding for the open state.
        type: [ boolean ]

props:
    -   name: disabled
        description: Disable the collapsible header.
        type: boolean
        optional: true

    -   name: href
        description: When set, clicking the header navigates to the URL and opens the collapsible.
        type: string
        optional: true

    -   name: icon-leading
        description: The icon at the start of the header.
        type: FluxIconName
        optional: true

    -   name: is-opened
        description: Controls the open state externally. Works with v-model.
        type: boolean
        optional: true

    -   name: label
        description: The label shown in the header.
        type: string
        optional: true

    -   name: rel
        description: Same as the <a> HTML element (only used with href).
        type: string
        optional: true

    -   name: target
        description: Same as the <a> HTML element (only used with href).
        type: string
        optional: true

    -   name: to
        description: Vue Router location. When set, clicking the header navigates and opens the collapsible.
        type: To
        optional: true
---

# Menu collapsible

A menu item that expands to reveal a nested group of sub-items. When Vue Router is available, the collapsible automatically opens if any direct sub-item's `to` or `href` matches the current route.

If a `to` or `href` is set on the collapsible itself, clicking the header navigates and opens the group in a single interaction. Without those props, clicking the header simply toggles the open state.

::: render
render=../../code/components/menu/collapsible/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A collapsible group without its own route. Click the header to toggle.
example=../../code/components/menu/collapsible/basic.vue
:::

::: example Navigate || A collapsible with a link on the header. Clicking navigates and opens.
example=../../code/components/menu/collapsible/navigate.vue
:::

::: example Controlled || Control the open state from outside with v-model:isOpened.
example=../../code/components/menu/collapsible/controlled.vue
:::

## Used components

- [Menu item](./item)
- [Icon](../icon)
