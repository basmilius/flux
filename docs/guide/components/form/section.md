---
outline: deep

props:
    -   name: title
        description: The title of the section.
        type: string

slots:
    -   name: default
        description: The form fields within this section.
---

# Form section

The form section groups related fields under a shared title. It helps divide longer forms into logical blocks, making them easier to scan and complete.

::: render
render=../../../code/guide/components/form/section/preview.vue
:::

::: tip
This component is best used within a [Form](../form).
:::

<FrontmatterDocs/>
