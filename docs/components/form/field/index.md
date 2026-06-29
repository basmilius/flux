---
outline: deep

props:
    -   name: as
        description: Whether the field wraps a single control or a group of controls. In group mode the label is rendered as a group label (role="group" + aria-labelledby) instead of a <label for>, so multiple controls stay accessible without duplicate ids.
        type: "'field' | 'group'"
        optional: true
        default: field

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
            label: string
            maxLength: "number | undefined"

    -   name: value
        description: An optional value that can be shown next to the label.
        type:
            currentLength: "number | undefined"
            error: "string | undefined"
            hint: "string | undefined"
            isOptional: "boolean | undefined"
            label: string
            maxLength: "number | undefined"
        
requiredIcons:
    - circle-exclamation
    - circle-info
---

# Field

The form field component is a base component that wraps a form control, such as [FluxFormInput](../input/index.md). It provides a label, error and hint. Fields can also be marked optional.

By default a field wraps a **single** control and associates its label with that control through `<label for>`. When a field hosts a **group** of controls — multiple [checkboxes](../checkbox), a [Checkbox group](../checkbox), or a [Radio group](../radio/group) — set `as="group"`. The label is then rendered as a group label (`role="group"` + `aria-labelledby`), which keeps the markup accessible and avoids the duplicate `id`s that a single shared `for` would create.

::: render
render=../../../code/components/form/field/preview.vue
:::

::: info Accessibility
The `error` and `hint` messages are linked to the control through `aria-describedby`, so assistive technology announces them when the control is focused. The error message also carries `role="alert"` so it is announced as soon as it appears.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic form field.
example=../../../code/components/form/field/basic.vue
:::

::: example Optional || An optional form field.
example=../../../code/components/form/field/optional.vue
:::

::: example Hint and error || A form field with a hint and error.
example=../../../code/components/form/field/error-hint.vue
:::

::: example Multiple hints or errors || A form field with multiple hints and errors.
example=../../../code/components/form/field/error-hint-multiple.vue
:::

::: example Group || A field hosting a group of controls with `as="group"`.
example=../../../code/components/form/field/group.vue
:::

## Used components

- [Form](../../form)
    - [Addition](./addition)
