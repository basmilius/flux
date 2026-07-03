---
outline: deep

emits:
    -   name: submit
        description: Triggered when the form is submitted.

props:
    -   name: disabled
        description: Disable the entire form.
        type: boolean
        optional: true
---

# Form

Form layout components arrange inputs, selects, checkboxes and other controls into a clear, consistent structure, making forms easier to scan and complete.

::: render
render=../../code/components/form/preview.vue
:::

::: info
The form renders with `novalidate`, so the browser's native bubble validation is suppressed. Flux components surface validation through their own `error` prop and the [Form field](./field/) instead.
:::

<FrontmatterDocs/>

## Examples

::: example Login
example=../../code/components/form/login.vue
:::

::: example Contact || A contact form combining a `FluxFormGrid`, single fields, and a textarea, all wrapped inside a single `FluxForm`.
example=../../code/components/form/contact.vue
:::

## Used components

- [Disabled](../disabled)
