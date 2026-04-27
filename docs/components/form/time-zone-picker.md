---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ string | null ]

props:
    -   name: model-value
        description: The value of the timezone picker.
        type: [ "string", "null" ]

    -   name: auto-focus
        description: Focus the picker when the form is mounted.
        type: boolean
        optional: true
        default: false

    -   name: disabled
        description: If the timezone picker is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the picker is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-condensed
        description: Renders the picker in a compact style with reduced padding.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading spinner inside the picker.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the picker is readonly. Blocks opening the popup.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the field is secondary and is rendered in an alternative style.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute passed to the underlying select.
        type: string
        optional: true

    -   name: placeholder
        description: The placeholder of the timezone picker.
        type: string
        optional: true

requiredIcons:
    - angle-down
    - magnifying-glass
---

# Time zone picker

This is a time zone select component designed to help users easily choose their preferred time zone from a comprehensive list of options. Users can efficiently set their time zone, ensuring that date and time-related information is accurate and synchronized with their location, making it ideal for platforms where precise time tracking and coordination are essential, such as global event scheduling, travel booking, or remote team collaboration.

::: render
render=../../code/components/form/time-zone-picker/preview.vue
:::

<FrontmatterDocs/>

## Example

::: example Basic || A basic time zone picker.
example=../../code/components/form/time-zone-picker/basic.vue
:::

## Used components

- [Form](../form)
    - [Select](./select)
