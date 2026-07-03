---
outline: deep
---

# Typography

Flux ships a consistent typographic system covering font families, sizes, weights, and spacing. This page documents how typography works in Flux and how to apply it to text throughout your application.

::: tip
Flux uses the [Inter Variable](https://rsms.me/inter/) font family by default, you will need to include the font in your application for it to work.
:::

## Examples
::: example Headings
example=../../code/guide/introduction/typography/headings.vue
:::

::: example Paragraph
example=../../code/guide/introduction/typography/paragraph.vue
:::

::: example Lists
example=../../code/guide/introduction/typography/lists.vue
:::

::: example Image
example=../../code/guide/introduction/typography/image.vue
:::

::: example Blockquote
example=../../code/guide/introduction/typography/blockquote.vue
:::

## Using Inter Variable font
If you desire to use the **Inter Variable** font, you need to override the `--font-sans` css variable. To achieve this, you'll need to add the following to your application.
```css [app.css]
:root {
    --font-sans: inter-variable, sans-serif;
}
```
