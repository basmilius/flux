---
outline: deep

props:
    -   name: content
        description: The full response received so far, not the latest delta. The consumer appends, the component renders.
        type: string

    -   name: has-markdown
        description: Renders the content as markdown. Turn it off to show it as plain text with its line breaks intact.
        type: boolean
        default: true
        optional: true

    -   name: is-streaming
        description: Indicates that more text is still coming. Fades each new word in and holds back the constructs the response can be cut off in the middle of.
        type: boolean
        optional: true

slots:
    -   name: code
        description: Replaces the rendering of a fenced code block. Receives the code and the language from the info string.
        type:
            code: string
            language: string | undefined

requiredIcons:
    - check
    - copy
---

# Streaming text

Renders a model response while it is still arriving. The markdown stays valid at
every character, each word fades in as it lands, and fenced code blocks get a
language label and a copy button.

::: render
render=../../code/ai/streaming-text/preview.vue
:::

::: tip
The rendered markdown lands inside [Prose](/components/prose), so a response
picks up the same typography as the rest of your application.
:::

::: warning
A model response is untrusted input. Raw HTML in `content` is rendered as the
text it is and never as markup, links are limited to the `http`, `https`,
`mailto` and `tel` schemes, and every external link that survives opens in a new
tab with `rel="noopener noreferrer nofollow"`. There is no HTML escape hatch, by
design.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A response that has finished. Without `is-streaming` nothing fades and nothing is held back.
example=../../code/ai/streaming-text/basic.vue
:::

::: example Streaming || Append to `content` as tokens arrive and keep `is-streaming` on until the response is done. A half written bold run or link never flickers between interpretations.
example=../../code/ai/streaming-text/streaming.vue
:::

::: example Code blocks || Every fenced block gets a header with the language from the info string and a button that copies the code.
example=../../code/ai/streaming-text/code.vue
:::

::: example Custom code block || The `code` slot takes over the rendering of a fenced block, for instance to drop in your own highlighter.
example=../../code/ai/streaming-text/custom-code.vue
:::

::: example Plain text || With `has-markdown` off the content is shown as written, line breaks included. Useful for a model that is not asked for markdown.
example=../../code/ai/streaming-text/plain.vue
:::

::: example Untrusted content || Markup, event handlers and dangerous link schemes in a response all come out inert.
example=../../code/ai/streaming-text/untrusted.vue
:::

## Notes

- The component parses only the part of the response that can still change, so
  the work per token stays the same whether the response is one paragraph or
  fifty. The `useStreamingMarkdown` composable exposes that logic on its own.
- While `is-streaming` is set the element is a polite live region that is not
  atomic, so a screen reader reads what was added instead of the whole response
  again.
- Words appear at once for a visitor who prefers reduced motion, and the fade can
  be turned off or retimed for everyone through [configuration](../introduction/configuration#streaming).
- Character references such as `&amp;` are shown as written rather than decoded.
  What you see is exactly what the model sent.

## Used components

- [Prose](../../components/prose)
- [Icon](../../components/icon)
