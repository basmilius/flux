---
outline: deep

props:
    -   name: asChild
        description: Merges the typography styling onto the single child element instead of rendering a wrapper. Useful when you already have a semantic root such as an article.
        type: boolean
        optional: true

    -   name: container
        description: Constrains the content to a centered reading measure. Set the width through the --flux-typography-container custom property, which defaults to 90ch.
        type: boolean
        optional: true

    -   name: tag
        description: The HTML element that is rendered. Defaults to a div, use article or section for document content.
        type: string
        optional: true

slots:
    -   name: default
        description: The prose content, made up of regular HTML elements such as headings, paragraphs, lists and tables.
---

# Typography

The Typography component turns plain HTML into rich, readable prose. Everything you drop inside it, headings, paragraphs, lists, blockquotes, code, tables and images, is styled with a consistent type scale and vertical rhythm, so you can write an article without reaching for custom CSS.

::: render
render=../code/components/typography/preview.vue
:::

::: tip
Outside of Typography, Flux keeps only light element defaults (heading sizes, link and monospace styling). The rich prose styling, vertical rhythm, decorated blockquotes, list markers and table borders, applies only within `FluxTypography`.
:::

By default Typography renders a `div`. Set `tag` to render a different wrapper such as an `article`, or use `as-child` to merge the styling onto the single child element without any wrapper at all.

For long form reading, add the `container` prop to cap the content at a comfortable measure and center it. The width is driven by the `--flux-typography-container` custom property (default `90ch`), so you can set it to `72ch`, `78ch`, `84ch` or any value you like.

Use [Text](/components/text) instead when you need a single styled piece of inline text, such as a label, a metric or a caption. Typography is for flowing document content, Text is for individual strings.

<FrontmatterDocs/>

## Examples

::: example Headings || The six heading levels, each with its own size and weight.
example=../code/components/typography/headings.vue
:::

::: example Paragraphs || Body copy flows with a comfortable line height and automatic spacing between blocks.
example=../code/components/typography/paragraph.vue
:::

::: example Lists || Ordered and unordered lists get markers, indentation and nested styling.
example=../code/components/typography/lists.vue
:::

::: example Blockquote || A quote is set off with an accent border and italics.
example=../code/components/typography/blockquote.vue
:::

::: example Code || Inline code renders as a chip, while a pre block becomes a scrollable code block.
example=../code/components/typography/code.vue
:::

::: example Table || Tables get borders, padding and a subtle header background.
example=../code/components/typography/table.vue
:::

::: example Reset || Wrap a foreign component in Typography Reset to keep it out of the prose styling while it still flows in the vertical rhythm.
example=../code/components/typography/reset.vue
:::

::: example Full article || Everything together: headings, body copy, lists, a blockquote, inline and block code, a keyboard shortcut, a table, an image, and a Flux pane embedded through Typography Reset.
example=../code/components/typography/article.vue
:::
