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

When it comes to designing forms on a website, the layout is just as important as the individual form components themselves. The way that input fields, dropdown menus, checkboxes, and other form elements are arranged can impact how easily users can navigate and complete the form. That's why it's important to have a set of components specifically designed for form layout.

::: render
render=../../../code/guide/components/form/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Login
example=../../../code/guide/components/form/login.vue
:::

## Used components

- [Disabled](../disabled)
