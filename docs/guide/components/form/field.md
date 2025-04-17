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
    - check
    - minus
---

# Field

Todo

::: render
render=../../../code/guide/components/form/field/preview.vue
:::

<FrontmatterDocs/>
