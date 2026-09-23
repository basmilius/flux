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
        type: string
        optional: true

requiredIcons:
    - magnifying-glass
    - circle-check
---

# Filter option (async)

The async option filter lets users pick a single option from a set that is fetched on demand. It writes the selection to the filter state automatically.

::: render
render=../../code/filter/components/async-option/preview.vue
:::

::: warning
This component can only be used within a [Filter](./filter).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/filter/components/async-option/snippet.vue [FilterAsyncOption.vue]

:::

## Used components

- [Form](../../components/form)
    - [Input](../../components/form/input)
- [Menu](../../components/menu)
    - [Group](../../components/menu/group)
    - [Item](../../components/menu/item)
    - [Sub header](../../components/menu/sub-header)
