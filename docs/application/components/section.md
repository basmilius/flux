---
outline: deep

props:
    -   name: title
        description: The title shown in the section header.
        type: string
        optional: true

    -   name: info
        description: A small piece of meta information shown next to the title (e.g. an item count).
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the section.

    -   name: end
        description: Content rendered at the end of the section header — typically a single action button.
---

# Application section

The application section groups related content under an optional `<h2>` header. Use it to break the content of a page into clearly labelled blocks. The header can also display a small piece of meta information through the `info` prop and an action through the `end` slot.

::: render
render=../../code/application/section/preview.vue
:::

<FrontmatterDocs/>
