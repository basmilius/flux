---
outline: deep

props:
    -   name: auto-focus
        description: Focus the combobox when the form is mounted.
        type: boolean
        optional: true

    -   name: disabled
        description: Whether the combobox is disabled.
        type: boolean
        optional: true

    -   name: error
        description: An error message, putting the combobox in an invalid state.
        type: [ 'string | null' ]
        optional: true

    -   name: is-condensed
        description: Renders the combobox in a compact style with reduced padding.
        type: boolean
        optional: true

    -   name: is-creatable
        description: Whether the user can create new entries by typing a value that does not match an existing option.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading spinner inside the combobox.
        type: boolean
        optional: true

    -   name: is-multiple
        description: Whether multiple values can be selected.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the combobox is read-only. Blocks opening the popup.
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

    -   name: options
        description: The available options.
        type: FluxFormSelectEntry[]

    -   name: placeholder
        description: Placeholder shown when nothing is selected.
        type: string
        optional: true

emits:
    -   name: "update:modelValue"
        description: Triggered when the selection changes.
        type: [ FluxFormSelectValue ]

requiredIcons:
    - angles-up-down
    - magnifying-glass
    - plus
    - xmark
---

# Combobox

The Combobox component is a searchable select. With `is-creatable` enabled it also lets users add entries that are not in the list, by typing a value and pressing Enter or clicking the "Create" option. Created entries are tracked internally so they appear immediately as selected.

::: render
render=../../code/components/form/combobox/preview.vue
:::

::: tip
For a plain, option-bounded select without free-text entry, use [Select](./select/) instead.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A searchable combobox bound to a list of options.
example=../../code/components/form/combobox/basic.vue
:::

::: example Creatable || A combobox that allows creating new entries.
example=../../code/components/form/combobox/creatable.vue
:::

::: example Multiple || A creatable combobox that allows multiple values.
example=../../code/components/form/combobox/multiple.vue
:::

## Used components

- [Select](./select/)
