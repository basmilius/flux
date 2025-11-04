---
outline: deep

props:
    -   name: icon
        description: The icon of the form field addition
        type: FluxIconName
        optional: true
        
    -   name: message
        description: The message to display
        type: string
        optional: true
        
    -   name: mode
        description: The mode of the form field addition
        type: [ '"hint"', '"error"' ]
        optional: true
        default: hint
---

# Field addition

The field addition is used to display contextual text beneath an input field, providing either a hint or an error message. Hints offer subtle guidance or clarification to help users input information correctly, while errors appear when validation fails, clearly indicating what needs to be fixed.

::: render
render=../../../code/guide/components/form/field-addition/preview.vue
:::

::: tip
This component is best used within a [Form field](./field.md).
:::

<FrontmatterDocs/>

## Examples

::: example Hint || A form field addition that displays a hint.
example=../../../code/guide/components/form/field-addition/hint.vue
:::

::: example Error || A form field addition that displays an error.
example=../../../code/guide/components/form/field-addition/error.vue
:::

## Used components

- [Icon](../icon)
