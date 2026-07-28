---
outline: deep

props:
    -   name: columns
        description: The number of columns. Pass a single number for every screen size, or an object with a number per breakpoint. A breakpoint that is left out inherits the one below it, and an object without xs starts at a single column.
        type: [ 'number', '{ xs?: number; sm?: number; md?: number; lg?: number; xl?: number }' ]
        default: 3
        optional: true

    -   name: gap
        description: The space between the columns and below every item, in pixels.
        type: number
        default: 15
        optional: true

    -   name: tag
        description: The HTML tag to use for the masonry.
        type: keyof HTMLElementTagNameMap
        default: div
        optional: true

slots:
    -   name: default
        description: The items of the masonry.
---

# Masonry

The masonry packs items of differing heights into columns and closes up the gaps a grid leaves at the end of every row. Each item keeps its own height and drops into the shortest column, which suits an image gallery, a card wall or a board of notes.

::: render
render=../../code/components/layout/masonry/preview.vue
:::

::: tip
Items read down each column, not across the rows: the second item sits below the first, not next to it. That is the right order for a gallery or a card wall, and the wrong one for content the reader works through in sequence, such as a ranked list or a set of numbered steps. Reach for the [Grid](./grid/) there.
:::

::: info
The masonry owns the columns and the gap, nothing else. Items bring their own box: background, padding, radius, and a margin when they need more room than the gap gives. A margin declared on an item overrides the gap.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Six notes of different lengths in three columns. Nothing is stretched or cropped to make the rows line up.
example=../../code/components/layout/masonry/basic.vue
:::

::: example Responsive columns || Pass an object to set the column count per breakpoint. Anything left out inherits the breakpoint below it, so `{xs: 1, sm: 2, lg: 4}` covers `md` and `xl` as well.
example=../../code/components/layout/masonry/responsive.vue
:::

::: example Custom gap || One gap sets both the space between the columns and the space below every item.
example=../../code/components/layout/masonry/gap.vue
:::

::: example Image gallery || Photos of differing shapes are the case the masonry was made for.
example=../../code/components/layout/masonry/gallery.vue
:::
