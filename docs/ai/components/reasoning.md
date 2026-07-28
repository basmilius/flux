---
outline: deep

emits:
    -   name: update:isExpanded
        description: Triggered when the block is folded open or closed.
        type: [ boolean ]

props:
    -   name: content
        description: The reasoning text, shown when there is no default slot. Line breaks are kept.
        type: string
        optional: true

    -   name: duration
        description: How long the model reasoned, in seconds. Shown in the summary once it is done.
        type: number
        optional: true

    -   name: is-expanded
        description: Whether the block is folded open. Use it with v-model.
        type: boolean
        default: false
        optional: true

    -   name: is-streaming
        description: Indicates that the model is still reasoning. Shows a spinner and a shimmering summary instead of the duration.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The body of the block. Replaces the plain rendering of content, for instance with markdown.

requiredIcons:
    - angle-down
    - brain
---

# Reasoning

Shows what a model was thinking before it answered. While it reasons the block
summarizes itself as a line that is still running; once it is done the summary
says how long it took. The detail itself is folded away.

::: render
render=../../code/ai/reasoning/preview.vue
:::

::: tip
Reasoning is usually the least interesting part of a response, so the block
starts closed. Open it by default only when the reasoning is the answer.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A block that has finished. The duration turns the summary into a statement of what happened.
example=../../code/ai/reasoning/basic.vue
:::

::: example Streaming || With `is-streaming` the summary shimmers and a spinner replaces the icon, so the block reads as busy even when it is folded shut.
example=../../code/ai/reasoning/streaming.vue
:::

::: example Controlled || `v-model:is-expanded` lets the surrounding page fold the block, for instance from a control that opens every step of an answer at once.
example=../../code/ai/reasoning/expanded.vue
:::

::: example Markdown reasoning || Put a [Streaming text](./streaming-text) in the default slot when the model reasons in markdown.
example=../../code/ai/reasoning/markdown.vue
:::

## Notes

- The summary line is the button that folds the block, and it carries
  `aria-expanded` and `aria-controls` for the region it opens.
- The shimmer holds still when the visitor prefers reduced motion.
- A duration under a minute reads as seconds; anything longer is split into
  minutes and seconds.

## Used components

- [Expandable](../../components/expandable/)
- [Icon](../../components/icon)
- [Spinner](../../components/spinner)
