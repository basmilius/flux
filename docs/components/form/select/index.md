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
        description: Shows a loading spinner inside the select.
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

    -   name: is-searchable
        description: If the select element is searchable.
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

    -   name: options
        description: The options to display in the select element. Options can be grouped.
        type: FluxFormSelectEntry[]

requiredIcons:
    - angles-up-down
    - magnifying-glass
    - xmark
---

# Select

The select lets users choose one or more options from a list. Enable `is-searchable` to filter long lists and `is-multiple` to allow several values at once. Options can be grouped.

::: render
render=../../../code/components/form/select/preview.vue
:::

::: info Accessibility
The control is exposed as a `role="combobox"` and tracks the highlighted option through `aria-activedescendant` and `aria-controls` while the popup is open. When `name` is set, the selected values are mirrored into a hidden input so the select participates in native form submission.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic form select.
example=../../../code/components/form/select/basic.vue
:::

::: example Searchable || A form select in where you can search for the items.
example=../../../code/components/form/select/searchable.vue
:::

::: example Multiple || A form select in where you can select multiple options.
example=../../../code/components/form/select/multiple.vue
:::

::: example Read-only || A read-only select that shows its value but cannot be opened or changed.
example=../../../code/components/form/select/readonly.vue
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
