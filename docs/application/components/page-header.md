---
outline: deep

props:
    -   name: description
        description: A supporting line shown below the title.
        type: string
        optional: true

    -   name: title
        description: The title of the page, rendered as the `<h1>`. Not needed when the `title` slot is used.
        type: string
        optional: true

slots:
    -   name: actions
        description: The controls of the page, rendered at the end of the title row.

    -   name: default
        description: Content rendered below the title row, typically a `FluxTabBar`.

    -   name: title
        description: Replaces the text inside the `<h1>`, for when the title is more than a string.
---

# Application page header

The application page header is the masthead of a page: the page title, an optional description, the actions of the page and, when a page has several views, a tab bar below it. It is the first child of an [Application content](./content) area and replaces the block that every dashboard page would otherwise hand-roll.

::: render
render=../../code/application/page-header/preview.vue
:::

::: tip
The header renders the `<h1>` of the page, so use exactly one per page and do not nest it in another heading structure. It belongs directly inside [Application content](./content), before the [Application sections](./section) that make up the page. It has no gutter of its own; it inherits the one from the content area, so it lines up with everything below it.
:::

::: tip
Prefer this over the [Application hero](./hero) whenever a page has actions or tabs. The hero stays the lighter option for a page that only needs a title and a subtitle.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A title and a description. The header grows with its content, so a long description simply wraps.
example=../../code/application/page-header/basic.vue
:::

::: example With actions || The `actions` slot holds the controls of the page. The row wraps when it runs out of room and moves below the title on narrow viewports. For actions that should shrink to icons instead of wrapping, nest a `FluxAdaptiveGroup` with `FluxAdaptiveSlot` items inside the slot.
example=../../code/application/page-header/with-actions.vue
:::

::: example With a tab bar || The default slot renders below the title row. Use it for a `FluxTabBar` when the page has several views.
example=../../code/application/page-header/with-tabs.vue
:::
