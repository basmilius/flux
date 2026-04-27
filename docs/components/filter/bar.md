---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the filter state changes.
        type: [ FluxFilterState ]

    -   name: update:search
        description: Triggered when the search query changes.
        type: [ string ]

    -   name: reset
        description: Triggered when a filter is reset. Contains the name of the reset filter field.
        type: [ string ]

props:
    -   name: model-value
        description: The filter state.
        type: FluxFilterState

    -   name: search
        description: The current search query.
        type: string
        optional: true

    -   name: is-searchable
        description: Whether the search input is shown.
        type: boolean
        optional: true

    -   name: resettable
        description: The fields that are resettable.
        type: string[]
        optional: true

    -   name: search-placeholder
        description: The placeholder text for the search input.
        type: string
        optional: true

slots:
    -   name: default
        description: This slot should contain filter components.

requiredIcons:
    - magnifying-glass
    - sliders-simple
---

# Filter bar

The filter bar combines a search input with dynamic filter buttons into a single toolbar. Active filters are shown as individual buttons with a badge indicating the selected value. When the bar runs out of space, overflow filters collapse into a flyout menu. This component is an alternative to [Filter](./index) and is well suited for use above data tables.

::: render
render=../../code/components/filter/bar/preview.vue
:::

::: tip
Don't make your view too complex. Limit yourself to one filter bar per view.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic filter bar with a search input and filters.
example=../../code/components/filter/bar.vue
:::

## Used components

- [Filter](./index)
- [Flyout](../flyout)
- [Form](../form)
    - [Input](../form/input/)
- [Button](../button)
    - [Secondary](../button/secondary)
- [Menu](../menu)
- [Overflow bar](../overflow-bar)
- [Separator](../separator)
