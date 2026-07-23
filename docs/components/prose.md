---
outline: deep

props:
    -   name: asChild
        description: Merges the prose styling onto the single child element instead of rendering a wrapper. Useful when you already have a semantic root such as an article.
        type: boolean
        optional: true

    -   name: container
        description: Constrains the content to a centered reading measure. Set the width through the --flux-prose-container custom property, which defaults to 90ch.
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

# Prose

The Prose component turns plain HTML into rich, readable prose. Everything you drop inside it, headings, paragraphs, lists, blockquotes, code, tables and images, is styled with a consistent type scale and vertical rhythm, so you can write an article without reaching for custom CSS.

::: render
render=../code/components/prose/preview.vue
:::

::: tip
Outside of Prose, Flux keeps only light element defaults (heading sizes, link and monospace styling). The rich prose styling, vertical rhythm, decorated blockquotes, list markers and table borders, applies only within `FluxProse`.
:::

By default Prose renders a `div`. Set `tag` to render a different wrapper such as an `article`, or use `as-child` to merge the styling onto the single child element without any wrapper at all.

For long-form reading, add the `container` prop to cap the content at a comfortable measure and center it. The width is driven by the `--flux-prose-container` custom property (default `90ch`), so you can set it to `72ch`, `78ch`, `84ch` or any value you like.

In container mode the content is laid out on a break-out grid, so individual elements can reach past the measure. Mark an element with `data-flux-prose-wide` to break out to a wider track, or `data-flux-prose-full` for a full-bleed element that spans the whole container. The gutter and the extra width of the wide track are set through the `--flux-prose-gutter` (default `24px`) and `--flux-prose-wide` (default `12ch`) custom properties.

Because Prose only styles its own HTML elements, you can drop a Flux component straight into an article without a wrapper: it keeps its own styling and still flows in the vertical rhythm.

Use [Text](/components/text) instead when you need a single styled piece of inline text, such as a label, a metric or a caption. Prose is for flowing document content, Text is for individual strings.

<FrontmatterDocs/>

## Examples

::: example Headings || The six heading levels, each with its own size and weight.
example=../code/components/prose/headings.vue
:::

::: example Paragraphs || Body copy flows with a comfortable line height and automatic spacing between blocks.
example=../code/components/prose/paragraph.vue
:::

::: example Lists || Ordered and unordered lists get markers, indentation and nested styling.
example=../code/components/prose/lists.vue
:::

::: example Blockquote || A quote is set off with an accent border and italics.
example=../code/components/prose/blockquote.vue
:::

::: example Code || Inline code renders as a chip, while a pre block becomes a scrollable code block.
example=../code/components/prose/code.vue
:::

::: example Table || Tables get borders, padding and a subtle header background.
example=../code/components/prose/table.vue
:::

::: example Break-out || In container mode, mark an element with data-flux-prose-wide or data-flux-prose-full to break it out of the reading measure.
example=../code/components/prose/breakout.vue
:::

::: example Embedded component || Drop a Flux component straight into an article. Prose only styles its own HTML elements, so the component keeps its own styling while flowing in the vertical rhythm.
example=../code/components/prose/embed.vue
:::

::: example Full article || Everything together: headings, body copy, lists, a blockquote, inline and block code, a keyboard shortcut, a table, an image, and an embedded Flux pane.
example=../code/components/prose/article.vue
:::

## Used components

- [Text](/components/text)
