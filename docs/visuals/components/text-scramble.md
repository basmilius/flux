---
outline: deep

emits:
    -   name: finished
        description: Triggered when the decode animation settles on the final text.
        type: [ ]

props:
    -   name: text
        description: The text that is displayed. Whenever this value changes, the label decodes from the text on screen to the new one through random characters.
        type: string

    -   name: characters
        description: The pool of characters the scramble cycles through while decoding.
        type: string
        default: A-Za-z0-9
        optional: true

    -   name: duration
        description: The total decode duration, in milliseconds.
        type: number
        default: 900
        optional: true

    -   name: skip-unchanged
        description: Keeps characters that are identical at the same index static, so only the parts that actually change decode. Turn this off to re-scramble the whole string.
        type: boolean
        default: true
        optional: true

    -   name: speed
        description: How often each cell swaps to a new random character while decoding, in milliseconds. Lower values cycle faster.
        type: number
        default: 45
        optional: true

    -   name: stagger
        description: How much the per-character reveal ripples across the string, between 0 and 1. 0 decodes every character together, 1 reveals them one after another.
        type: number
        default: 0.5
        optional: true
---

# Text scramble

Text scramble renders a single `<span>` that "decodes" its text: whenever `text` changes each character cycles through random glyphs before settling on its final one, rippling across the string from left to right. It is ideal for dashboard widgets that refresh, status reveals and headline transitions.

::: render
render=../../code/visuals/text-scramble/preview.vue
:::

::: tip
The decode respects `prefers-reduced-motion`: when reduced motion is requested the text swaps straight to its target instead of scrambling. The current `text` is always exposed as the accessible label, so screen readers read the real value rather than the random glyphs.
:::

The component also exposes two imperative methods through a template ref: `set(text)` decodes to new text, and `replay()` re-runs the decode on the current text. A `finished` event fires once the animation settles.

<FrontmatterDocs/>

## Examples

::: example Widget refresh || Decode a value every time a dashboard tile refreshes, so the update reads as a live recompute rather than a silent swap.
example=../../code/visuals/text-scramble/widget.vue
:::

::: example Replay || Call replay() through a template ref to re-run the decode on demand, without changing the text.
example=../../code/visuals/text-scramble/replay.vue
:::

::: example Characters || Narrow the scramble pool with characters, for example to digits only so a counter decodes through numbers.
example=../../code/visuals/text-scramble/characters.vue
:::
