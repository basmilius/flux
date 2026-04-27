---
outline: deep

props:
    -   name: title
        description: The main title shown in the hero.
        type: string

    -   name: subtitle
        description: An optional supporting line shown below the title.
        type: string
        optional: true

slots:
    -   name: start
        description: Content rendered before the title block, such as a back button.

    -   name: before
        description: Content rendered above the title within the title block.

    -   name: after
        description: Content rendered below the subtitle within the title block.

    -   name: end
        description: Content rendered after the title block, such as action buttons.
---

# Application hero

The application hero introduces a page with a clear title and optional subtitle. It is the recommended starting point of any [Application content](./content) area and supports four positional slots — `start`, `before`, `after` and `end` — for adding contextual elements like back buttons, badges, breadcrumbs, or actions.

::: render
render=../../code/application/hero/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example With actions || Render action buttons next to the title using the `end` slot.
example=../../code/application/hero/with-actions.vue
:::
