---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ number ]

props:
    -   name: model-value
        description: The value of the input.
        type: number

    -   name: disabled
        description: If the input is disabled.
        type: boolean
        optional: true
        
    -   name: min
        description: The minimum selected value.
        type: number
        optional: true
        default: 0
        
    -   name: max
        description: The maximum selected value.
        type: number
        optional: true
        default: 100
        
    -   name: step
        description: The step that is used when going up or down in the quantity selector.
        type: number
        optional: true
        default: 1

requiredIcons:
    - plus
    - minus
---

# Quantity selector

A quantity selector can be used when users need to select an amount of something. For example, Within a shop, a user is able to select how many of a certain product they want to buy.

::: render
render=../../../code/guide/components/form/quantity-selector/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic quantity selector.
example=../../../code/guide/components/form/quantity-selector/basic.vue
:::

::: example Step || A quantity selector with steps.
example=../../../code/guide/components/form/quantity-selector/step.vue
:::

## Used components

- [Button](../button)
    - [Secondary](../button/secondary)
    - [Group](../button/group)
