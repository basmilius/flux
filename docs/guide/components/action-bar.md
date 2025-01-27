---
outline: deep

emits:
    -   name: reset
        description: Triggered when the filter reset button is clicked. This is not available if a custom filter opener button is used.
        type: [ ]

props:
    -   name: is-resettable
        description: Indicates that the applied filter is resettable.
        type: boolean
        optional: true

slots:
    -   name: primary
        description: A place for the primary action.

    -   name: actions-end
        description: The space at the end of the action bar.

    -   name: actions-start
        description: The space at the start of the action bar.

    -   name: actions-after-search
        description: The space after the search bar.

    -   name: actions-before-search
        description: The space before the search bar.

    -   name: search
        description: A place for the search bar.

    -   name: filter
        description: A place for the filter, which is shown in a flyout.
        type:
            paneX: number
            paneY: number
            openerWidth: number
            openerHeight: number
            close: "(): void"

    -   name: filter-opener
        description: A place for the filter opener button.
        type:
            close: "(): void"
            open: "(): void"
            toggle: "(): void"
            
requiredIcons:
    - filter
    - xmark
---

# Action bar

Action bars are toolbars commonly used alongside data tables. They can display a primary action, a search bar, and a filter button. Filters are typically displayed within a flyout containing a window.

::: render
render=../../code/guide/components/action-bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

Todo

## Used components

- [Button](./button)
- [Button group](./button-group)
- [Flyout](./flyout)
- [Spacer](./layout/spacer)
- [Stack](./layout/stack)
- [Tooltip](./tooltip)
