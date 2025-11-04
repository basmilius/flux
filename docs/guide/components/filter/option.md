---
outline: deep

props:
    -   name: icon
        description: The icon of the filter.
        type: FluxIconName
        optional: true

    -   name: is-searchable
        description: Indicates that the option filter is searchable.
        type: boolean
        optional: true

    -   name: label
        description: The label of the filter.
        type: string

    -   name: name
        description: The name of the filter within the filter state.
        type: string

    -   name: options
        description: The available options.
        type: "FluxFilterOptionRow[]"

    -   name: search-placeholder
        description: The placeholder to show in the search bar.
        type: boolean
        optional: true

requiredIcons:
    - magnifying-glass
    - circle-check
---

# Filter option

This component provides an option select functionality, allowing users to select a single option from a set of predefined options. It handles state updates automatically.

::: render
render=../../../code/guide/components/filter/option/preview.vue
:::

::: warning
This component can only be used within a [Filter](./index).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/guide/components/filter/option/snippet.vue [FilterOption.vue]

:::

## Used components

- [Form](../form)
    - [Input](../form/input)
- [Menu](../menu)
    - [Group](../menu/group)
    - [Item](../menu/item)
    - [Sub header](../menu/sub-header)
