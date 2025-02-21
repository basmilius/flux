---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the filter state changes.
        type: [ FluxFilterState ]

    -   name: reset
        description: Triggered when the user clicks the reset button. An optional field can be provided if a single filter entry should be resetted.
        type: [ string ]

props:
    -   name: model-value
        description: The filter state.
        type: FluxFilterState

    -   name: resettable
        description: The fields that are resettable.
        type: string[]
        optional: true

slots:
    -   name: default
        description: This slot should contain filters or a separator.

requiredIcons:
    - angle-left
    - angle-right
    - circle-check
    - magnifying-glass
    - trash
---

# Filter

This component enables the creation of nested filter menus with support for state management, navigation, and optional reset functionality. It uses height transitions for smooth visual changes and dynamically organizes filter content based on provided slots, making it adaptable to varying needs.

::: render
render=../../../code/guide/components/filter/preview.vue
:::

::: tip
Don't make your view too complex. Limit yourself to one filter per view.
:::

<FrontmatterDocs/>

## Available filters

- [Date](./date)
- [Date range](./date-range)
- [Option](./option)
- [Options](./options)
- [Range](./range)
- [Async option](./async-option)
- [Async options](./async-options)

## Used components

- [Menu](../menu)
    - [Group](../menu/group)
    - [Item](../menu/item)
- [Window](../window)
