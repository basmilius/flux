---
outline: deep

props:
    -   name: current-length
        description: The current length of the value.
        type: number
        optional: true

    -   name: error
        description: The error message shown after the input.
        type: string
        optional: true

    -   name: hint
        description: The hint message shown after the input.
        type: string
        optional: true

    -   name: is-optional
        description: Mark the field as optional.
        type: boolean
        optional: true

    -   name: label
        description: The label of the field.
        type: string

    -   name: max-length
        description: The maximum length of the value.
        type: number
        optional: true

slots:
    -   name: default
        description: The input for the field.
        type:
            id: string

    -   name: addition
        description: Any optional additions for the field.
        type:
            currentLength: "number | undefined"
            error: "string | undefined"
            hint: "string | undefined"
            isOptional: "boolean | undefined"
            label: "string | undefined"
            maxLength: "number | undefined"

    -   name: value
        description: An optional value that can be shown next to the label.
        type:
            currentLength: "number | undefined"
            error: "string | undefined"
            hint: "string | undefined"
            isOptional: "boolean | undefined"
            label: "string | undefined"
            maxLength: "number | undefined"
        
requiredIcons:
    - circle-exclamation
    - circle-info
---

# Field

The form field component is a base component that wraps a single form control, such as [FluxFormInput](../input/index.md). It provides a label, error and hint. Fields can also be marked optional.

::: render
render=../../../../code/guide/components/form/field/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic form field.
example=../../../../code/guide/components/form/field/basic.vue
:::

::: example Optional || An optional form field.
example=../../../../code/guide/components/form/field/optional.vue
:::

::: example Hint and error || A form field with a hint and error.
example=../../../../code/guide/components/form/field/error-hint.vue
:::

::: example Multiple hints or errors || A form field with multiple hints and errors.
example=../../../../code/guide/components/form/field/error-hint-multiple.vue
:::

## Used components

- [Form](../../form)
    - [Addition](./addition)
