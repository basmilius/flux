---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ boolean ]

props:
    -   name: model-value
        description: The value of the toggle.
        type: boolean

    -   name: icon-off
        description: The icon to use when the toggle is off.
        type: FluxIconName
        optional: true
        
    -   name: icon-on
        description: The icon to use when the toggle is on.
        type: FluxIconName
        optional: true
        
    -   name: disabled
        description: Whether the toggle is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the toggle is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-readonly
        description: If the toggle is readonly. Blocks toggling via mouse or keyboard.
        type: boolean
        optional: true

    -   name: is-switch
        description: Applies a switch style to the toggle. This means that the toggle won't change color when it's activated.
        type: boolean
        optional: true
---

# Toggle

The toggle switches between two states, on and off. Use it in settings and option panels to enable or disable a feature.

::: render
render=../../code/components/form/toggle/preview.vue
:::

::: info Accessibility
The toggle is exposed as a native `role="switch"` checkbox. State and validation attributes (`aria-checked`, `aria-disabled`, `aria-readonly`, `aria-invalid`) sit on that control, and when wrapped in a required [Form field](./field/) it also receives `aria-required`.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic toggle.
example=../../code/components/form/toggle/basic.vue
:::

::: example Icons || A toggle with icons for both the on and off state.
example=../../code/components/form/toggle/icon.vue
:::

::: example Switch || A toggle that serves as a switch.
example=../../code/components/form/toggle/switch.vue
:::

::: example Form || A toggle used in a form.
example=../../code/components/form/toggle/form.vue
:::

## Used components

- [Icon](../icon)
