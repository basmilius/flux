---
outline: deep

props:
    -   name: color
        description: The resting text color the shimmer sweeps across. Accepts any CSS color.
        type: string
        default: var(--gray-400)
        optional: true

    -   name: duration
        description: How long one shimmer sweep takes, in seconds.
        type: number
        default: 2
        optional: true

    -   name: shimmer-color
        description: The color of the highlight band that sweeps across the text. Accepts any CSS color.
        type: string
        default: var(--gray-950)
        optional: true

    -   name: spread
        description: The width of the highlight band, as a percentage of the text width. Larger values give a softer, wider glow.
        type: number
        default: 15
        optional: true

slots:
    -   name: default
        description: The text that the shimmer sweeps across.
---

# Text shimmer

Text shimmer sweeps a soft highlight across its text, a CSS-only loading shimmer for pending, streaming or "AI is thinking" states. The effect clips an animated gradient to the text itself, so it works on any font size or weight without extra markup.

::: render
render=../../code/visuals/text-shimmer/preview.vue
:::

::: tip
The sweep respects `prefers-reduced-motion`: when reduced motion is requested the text falls back to a plain, solid color with no animation. The text lives in the default slot, so it stays fully readable to screen readers.
:::

<FrontmatterDocs/>

## Examples

::: example Thinking || Show the shimmer while a task is running, then swap it for a solid result once it settles.
example=../../code/visuals/text-shimmer/thinking.vue
:::

::: example Colors || Tint the resting text and the highlight with color and shimmer-color, and widen the band with spread.
example=../../code/visuals/text-shimmer/colors.vue
:::
