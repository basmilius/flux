---
outline: deep
---

# Typography
Typography is a critical element of any user interface, and in Flux, we understand the importance of creating clear, consistent, and visually appealing typography in our components. This documentation provides you with everything you need to know about typography in Flux, including font families, sizes, weights, and spacing. By the end of this documentation, you'll have a solid understanding of typography in Flux and be able to create beautiful and readable text throughout your Vue application. So let's dive in!

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
If you desire to use the **Inter Variable** font, you need to override the `--font-sans` css variable. To achieve this, you’ll need to add the following to your application.
```css [app.css]
:root {
    --font-sans: inter-variable, sans-serif;
}
```
