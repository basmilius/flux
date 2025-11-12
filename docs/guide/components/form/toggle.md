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
        
    -   name: is-switch
        description: Applies a switch style to the toggle. This means that the toggle won't change color when it's activated.
        type: boolean
        optional: true
---

# Toggle

A toggle component is a type of user interface element that allows the user to switch between two states, such as "on" and "off." It is often represented as a switch or button that can be flipped to change the state. Toggles are commonly used in settings menus or options pages, allowing users to enable or disable specific features or settings. They provide a simple and intuitive way for users to interact with the interface and control the behavior of the application.

::: render
render=../../../code/guide/components/form/toggle/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic toggle.
example=../../../code/guide/components/form/toggle/basic.vue
:::

::: example Icons || A toggle with icons for both the on and off state.
example=../../../code/guide/components/form/toggle/icon.vue
:::

::: example Switch || A toggle that serves as a switch.
example=../../../code/guide/components/form/toggle/switch.vue
:::

::: example Form || A toggle used in a form.
example=../../../code/guide/components/form/toggle/form.vue
:::

## Used components

- [Icon](../icon)
