---
outline: deep

props:
    -   name: heading-level
        description: The heading level used for the section title. Choose a level that fits the surrounding document outline.
        type: "1 | 2 | 3 | 4 | 5 | 6"
        optional: true
        default: "3"

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
render=../../code/components/form/section/preview.vue
:::

::: info Accessibility
The section is exposed as a labelled group (`role="group"` + `aria-labelledby`) so assistive technology announces the title as the name of the contained fields. Use `heading-level` to keep the rendered heading (`<h1>`–`<h6>`) consistent with the surrounding document outline.
:::

::: tip
This component is best used within a [Form](../form).
:::

<FrontmatterDocs/>

## Examples

::: example Heading level || Render the section title as a real heading (h1–h6) instead of the default h3.
example=../../code/components/form/section/heading-level.vue
:::

## Snippet

::: code-group

<<< @/code/components/form/section/preview.vue [FluxFormSection.vue]

:::
