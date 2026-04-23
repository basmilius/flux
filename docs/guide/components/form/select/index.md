---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ FluxFormSelectValue ]

props:
    -   name: model-value
        description: The selected value(s) of the select element.
        type: FluxFormSelectValue

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

    -   name: is-condensed
        description: Renders the select in a compact style with reduced padding.
        type: boolean
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
        description: The options to display in the select element.
        type: FluxFormSelectOption[]

requiredIcons:
    - angle-down
    - magnifying-glass
---

# Select

This is a form select element that allows the user to choose from a list of options. It is similar to a drop-down menu, but with more advanced functionality. The select element can be configured to allow for the selection of multiple values, which is useful when the user needs to select more than one option. It's a great option for forms that require multiple selections, such as when a user needs to choose multiple interests, hobbies, or preferences.

::: render
render=../../../../code/guide/components/form/select/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic form select.
example=../../../../code/guide/components/form/select/basic.vue
:::

::: example Searchable || A form select in where you can search for the items.
example=../../../../code/guide/components/form/select/searchable.vue
:::

::: example Multiple || A form select in where you can select multiple options.
example=../../../../code/guide/components/form/select/multiple.vue
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
