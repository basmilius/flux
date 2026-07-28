---
outline: deep

props:
    -   name: code
        description: The code shown in the block. It is rendered as text and is what the copy button puts on the clipboard.
        type: string

    -   name: language
        description: The label shown in the header, taken from the info string of the fenced block. Falls back to Code when it is missing.
        type: string
        optional: true

requiredIcons:
    - check
    - copy
---

# Code block

`FluxAiCodeBlock` is the fenced code block of a model response: the code in a monospaced pane, with the language in the header and a button that copies it. [Streaming text](./streaming-text) renders one for every fenced block it comes across, and you reach for it directly when the code did not arrive as markdown, for instance a command a tool call returned.

::: render
render=../../code/ai/code-block/preview.vue
:::

::: tip
The copy button reports what it did instead of only changing its icon. Its label switches to `Copied` for two seconds in a polite live region, so a screen reader hears that the copy landed.
:::

::: warning
The code is rendered as text, never as markup, and nothing is highlighted. That is deliberate: a response is untrusted input, and a highlighter would have to be handed the same string as HTML. Use the `code` slot of [Streaming text](./streaming-text) when you want your own highlighter.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || The code, its language and the copy button. Line breaks in `code` are what you get on screen.
example=../../code/ai/code-block/basic.vue
:::

::: example Language label || The header shows `language` as it was given. Without one it reads `Code`, so the header never collapses.
example=../../code/ai/code-block/language.vue
:::

## Used components

- [Icon](../../components/icon)
