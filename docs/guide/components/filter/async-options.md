---
outline: deep

props:
    -   name: fetch-options
        description: A function that returns the option objects based on the selected value.
        type: "(ids: FluxFilterValue[]) => Promise<FluxFilterOptionRow[]>"

    -   name: fetch-relevant
        description: A function that returns the relevant options.
        type: "() => Promise<FluxFilterOptionRow[]>"

    -   name: fetch-search
        description: A function that returns the options based on the search query.
        type: "(searchQuery: string) => Promise<FluxFilterOptionRow[]>"

    -   name: icon
        description: The icon of the filter.
        type: FluxIconName
        optional: true

    -   name: label
        description: The label of the filter.
        type: string

    -   name: name
        description: The name of the filter within the filter state.
        type: string

    -   name: search-placeholder
        description: The placeholder to show in the search bar.
        type: boolean
        optional: true
---

# Filter options (async)

This component provides an option select functionality, allowing users to select multiple options from a set of options fetched remotely. It handles state updates automatically.

::: render
render=../../../code/guide/components/filter/async-options/preview.vue
:::

::: warning
This component can only be used within a [Filter](./index).
:::

<FrontmatterDocs/>

## Used components

- [Form](../form)
    - [Input](../form/input)
- [Menu](../menu)
    - [Group](../menu/group)
    - [Item](../menu/item)
    - [Sub header](../menu/sub-header)
