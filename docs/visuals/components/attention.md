---
outline: deep

emits:
    -   name: finished
        description: Triggered when the effect animation completes. Fires immediately when reduced motion is preferred.
        type: [ ]

props:
    -   name: effect
        description: The attention animation to play.
        type: [ '"pulse"', '"shake"', '"bounce"', '"tada"' ]
        default: pulse
        optional: true

    -   name: trigger
        description: Any change to this value replays the effect, so bind it to the data you want to draw attention to.
        type: unknown
        optional: true

    -   name: duration
        description: The length of the animation in milliseconds.
        type: number
        default: 700
        optional: true

slots:
    -   name: default
        description: The element that should receive the attention effect. The animation is applied directly to this element, without a wrapper, so it must be transformable (any display other than inline).
---

# Attention

A subtle attention nudge that plays a one-shot animation on command. Reach for it to highlight a KPI that just changed or a badge that needs a glance. Four effects are available: `pulse`, `shake`, `bounce` and `tada`.

::: render
render=../../code/visuals/attention/preview.vue
:::

Bind the `trigger` prop to a reactive value to replay the effect whenever it changes, or call the exposed `play()` method through a template ref. The `finished` event fires on animation end. When `prefers-reduced-motion` is set no animation plays and `play()` simply emits `finished` right away.

<FrontmatterDocs/>

## Examples

::: example Effects || Pick between the pulse, shake, bounce and tada effects.
example=../../code/visuals/attention/effects.vue
:::

::: example On change || Bind the trigger prop to a value so the effect replays each time it updates.
example=../../code/visuals/attention/trigger.vue
:::
