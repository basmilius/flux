---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ string ]
        
    -   name: blur
        description: Triggered when the textarea loses focus.
        type: [ ]
        
    -   name: focus
        description: Triggered when the textarea gains focus.
        type: [ ]

props:
    -   name: model-value
        description: The value of the textarea.
        type: string

    -   name: auto-complete
        description: Please refer to the HTMLTextAreaElement documentation for examples of values that can be given here.
        type: FluxAutoCompleteType
        optional: true
        
    -   name: auto-focus
        description: Focus when the textarea is mounted.
        type: boolean
        optional: true
        default: false
        
    -   name: disabled
        description: If the textarea is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the textarea is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-condensed
        description: Renders the textarea in a compact style with reduced padding.
        type: boolean
        optional: true

    -   name: is-loading
        description: Marks the textarea as loading.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the textarea is readonly.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the field is secondary and is rendered in an alternative style.
        type: boolean
        optional: true

    -   name: max-length
        description: The maximum value length of the textarea.
        type: number
        optional: true

    -   name: name
        description: The name attribute of the underlying textarea element.
        type: string
        optional: true

    -   name: placeholder
        description: The placeholder of the textarea.
        type: string
        optional: true
        
    -   name: rows
        description: The number of rows of the textarea.
        type: number
        optional: true
        default: 3
---

# Text area

A form text area is a text field that may have multiple lines of text. It is used for longer text and can be used within a contact form to ask for a question.

::: render
render=../../code/components/form/text-area/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic text area.
example=../../code/components/form/text-area/basic.vue
:::

::: example Multiple rows || A text area with multiple rows
example=../../code/components/form/text-area/rows.vue
:::
