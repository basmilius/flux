---
outline: deep

emits:
    -   name: shown
        description: Triggered when the draw animation completes. Inside a Highlighter group the group draws the annotation, so this is not emitted there.
        type: [ ]

    -   name: hidden
        description: Triggered when the annotation is hidden through the exposed hide() method.
        type: [ ]

props:
    -   name: variant
        description: The annotation style to draw.
        type: [ '"highlight"', '"box"', '"circle"', '"underline"', '"strike-through"', '"crossed-off"', '"bracket"' ]
        default: highlight
        optional: true

    -   name: color
        description: The color of the annotation. Accepts any CSS color.
        type: string
        default: var(--warning-200)
        optional: true

    -   name: stroke-width
        description: The width of the annotation stroke.
        type: number
        default: 1.5
        optional: true

    -   name: animation-duration
        description: The duration of the draw animation in milliseconds.
        type: number
        default: 500
        optional: true

    -   name: iterations
        description: How many times the annotation is drawn.
        type: number
        default: 2
        optional: true

    -   name: padding
        description: The spacing between the element and the annotation, in pixels.
        type: number
        default: 2
        optional: true

    -   name: multiline
        description: Annotate wrapped inline text line by line instead of as a single block.
        type: boolean
        default: true
        optional: true

    -   name: when-in-view
        description: Draw the annotation only once the element scrolls into view instead of immediately.
        type: boolean
        default: false
        optional: true

slots:
    -   name: default
        description: The content to annotate.
---

# Highlighter

This component draws a hand-drawn annotation, such as a highlight, underline, box or circle, around inline content. It builds on [rough-notation](https://roughnotation.com), so every stroke looks sketched rather than perfectly geometric, and the annotation animates itself into place.

::: render
render=../../code/visuals/highlighter/preview.vue
:::

The annotation is purely decorative and is drawn on top of the content, so it never affects layout or readability. The draw animation is skipped when `prefers-reduced-motion` is set, in which case the annotation appears instantly.

Inside a [Highlighter group](./highlighter-group) the group draws all annotations as one sequence and can supply defaults for the annotation props; a highlighter's own props always win. The component also exposes `show()`, `hide()` and `replay()` through a template ref for programmatic control.

<FrontmatterDocs/>

## Examples

::: example Actions || Seven annotation styles are available: highlight, underline, box, circle, bracket, strike-through and crossed-off.
example=../../code/visuals/highlighter/actions.vue
:::

::: example Colors || Any CSS color works. Reach for the theme tokens to keep the annotation in sync with light and dark mode.
example=../../code/visuals/highlighter/colors.vue
:::

::: example When in view || Set `when-in-view` to defer the animation until the element scrolls into the viewport.
example=../../code/visuals/highlighter/in-view.vue
:::

::: example Replay || Call show(), hide() or replay() through a template ref to control the annotation programmatically.
example=../../code/visuals/highlighter/replay.vue
:::
