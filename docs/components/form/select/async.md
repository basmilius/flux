---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ FluxFormSelectValue ]

    -   name: update:search-query
        description: Triggered when the search query changes. Use `v-model:search-query` to control or observe the search input.
        type: [ string ]

props:
    -   name: model-value
        description: The selected value(s) of the select element.
        type: FluxFormSelectValue

    -   name: search-query
        description: The current search query. Use `v-model:search-query` to control or observe the search input.
        type: string
        optional: true

    -   name: auto-focus
        description: Focus the select when the form is mounted.
        type: boolean
        optional: true
        default: false

    -   name: disabled
        description: If the select element is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the select is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-loading
        description: Shows a loading spinner inside the select (in addition to fetch-driven loading).
        type: boolean
        optional: true

    -   name: is-multiple
        description: If the select element allows multiple values to be selected.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the select is readonly. Blocks opening the popup.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the field is secondary and is rendered in an alternative style.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute passed to a hidden form control.
        type: string
        optional: true

    -   name: placeholder
        description: The placeholder text to display when no value is selected.
        type: string
        optional: true

    -   name: fetch-options
        description: The function to call when the form select needs options by their id.
        type: [ 'fetchOptions(ids: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]>' ]

    -   name: fetch-relevant
        description: The function to call when the form select needs relevant options.
        type: [ 'fetchRelevant(): Promise<FluxFormSelectEntry[]>' ]

    -   name: fetch-search
        description: The function to call when the form select needs options based on the given search query.
        type: [ 'fetchSearch(searchQuery: string): Promise<FluxFormSelectEntry[]>' ]

requiredIcons:
    - angles-up-down
    - magnifying-glass
    - xmark
---

# Select async

The async select fetches its options on demand instead of receiving them up front. Provide `fetch-relevant`, `fetch-search` and `fetch-options` to load the initial set, respond to the search query, and resolve selected values by their id. Enable `is-multiple` to allow several values at once.

::: render
render=../../../code/components/form/select/async/preview.vue
:::

::: tip
When the popup opens with an active search query, `fetch-search` is called with that query; otherwise `fetch-relevant` is used. This keeps a previously typed search reflected in the initial result set.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic asynchronous form select.
example=../../../code/components/form/select/async/basic.vue
:::

::: example Multiple || An asynchronous form select in where you can select multiple options.
example=../../../code/components/form/select/async/multiple.vue
:::

## Used components

- [Form](../../form)
    - [Input](../input)
- [Menu](../../menu)
    - [Item](../../menu/item)
    - [Group](../../menu/group)
    - [SubHeader](../../menu/sub-header)
- [Icon](../../icon)
- [Spinner](../../spinner)
- [Tag](../../tag)
