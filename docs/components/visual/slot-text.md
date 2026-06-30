---
outline: deep

props:
    -   name: text
        description: The text that is displayed. Whenever this value changes, the label rolls each character to its new glyph.
        type: string

    -   name: bounce
        description: Per-letter personality, between 0 and 1. 0 lands every glyph identically, 1 adds individual variation in speed and a little tilt-wobble as each settles.
        type: number
        default: 0.6
        optional: true

    -   name: chromatic
        description: Rolls every incoming glyph in with its own hue for a rainbow sweep across the line, then fades back to the resting color. Overrides color.
        type: boolean
        default: false
        optional: true

    -   name: color
        description: A CSS color the incoming glyphs are tinted with as they roll in, fading back to the resting color once they land.
        type: string
        optional: true

    -   name: color-fade
        description: How long the tint takes to fade back to the resting color, in milliseconds.
        type: number
        default: 280
        optional: true

    -   name: direction
        description: The roll direction. down lets glyphs enter from the top, up from the bottom.
        type: [ '"up"', '"down"' ]
        default: down
        optional: true

    -   name: duration
        description: The slide duration per character, in milliseconds.
        type: number
        default: 300
        optional: true

    -   name: easing
        description: The CSS easing function used for the roll. Defaults to a springy, overshooting curve.
        type: string
        default: cubic-bezier(0.34, 1.56, 0.64, 1)
        optional: true

    -   name: exit-offset
        description: How long the incoming glyph trails the outgoing one, in milliseconds.
        type: number
        default: 50
        optional: true

    -   name: interrupt
        description: When true, a new roll interrupts any roll in flight and starts fresh. When false, the current roll finishes and the latest request plays after it lands, dropping duplicates — ideal for spam-prone triggers.
        type: boolean
        default: true
        optional: true

    -   name: skip-unchanged
        description: Keeps characters that are identical at the same index static. Turn this off when the two strings are misaligned so the whole line rolls uniformly.
        type: boolean
        default: true
        optional: true

    -   name: stagger
        description: The delay between characters, in milliseconds.
        type: number
        default: 45
        optional: true
---

# Slot text

Slot text renders a single `<span>` that animates with a tactile per-character "roll": each character sits in its own clipped cell, and whenever the `text` changes the old glyph slides out while the new one chases it in with a springy overshoot. It is ideal for short labels, statuses, numbers and commands — the classic `Copy → Copied → Copy` button, a live status word or a changing counter.

::: render
render=../../code/components/visual/slot-text/preview.vue
:::

::: tip
The roll respects `prefers-reduced-motion`: when reduced motion is requested the text simply swaps instead of rolling. The current `text` is always exposed as the accessible label, so screen readers read the value rather than the individual glyph cells.
:::

The component also exposes two imperative methods through a template ref: `set(text, options?)` rolls to new text permanently, and `flash(text, options?)` rolls to temporary text and automatically rolls back — the spam-safe `Copy → Copied → Copy` pattern in one call.

<FrontmatterDocs/>

## Examples

::: example Basic || Bind a reactive value to text and the label rolls every time it changes.
example=../../code/components/visual/slot-text/basic.vue
:::

::: example Counter || Roll digits up or down to animate a counter, a quantity or a live metric. Tabular numbers keep the value from shifting horizontally.
example=../../code/components/visual/slot-text/counter.vue
:::

::: example Metric || A live KPI tile: the value streams in and rolls every time the data updates, so a dashboard stat feels alive without redrawing the card.
example=../../code/components/visual/slot-text/metric.vue
:::

::: example Trend || A delta indicator that rolls up and tints green when the reading rises, and rolls down and tints red when it falls.
example=../../code/components/visual/slot-text/trend.vue
:::

::: example Status || Tint each new status as it rolls in with the color prop, fading back to the resting color — ideal for job, order or deployment states.
example=../../code/components/visual/slot-text/status.vue
:::

::: example Clock || Frequent updates roll cleanly: only the digits that actually change re-roll, so a ticking clock animates just its seconds.
example=../../code/components/visual/slot-text/clock.vue
:::

::: example Flash || Call flash() through a template ref to roll to temporary text that automatically rolls back, ideal for copy buttons.
example=../../code/components/visual/slot-text/flash.vue
:::

::: example Direction || Roll glyphs upward or downward with the direction prop.
example=../../code/components/visual/slot-text/direction.vue
:::

::: example Chromatic || Enable chromatic for a rainbow hue sweep that fades back to the resting color as the glyphs land.
example=../../code/components/visual/slot-text/chromatic.vue
:::
