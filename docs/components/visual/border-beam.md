---
outline: deep

emits:
    -   name: activate
        description: Triggered when the fade-in animation completes.
        type: [ ]

    -   name: deactivate
        description: Triggered when the fade-out animation completes after the beam is deactivated.
        type: [ ]

props:
    -   name: active
        description: Whether the beam is playing. Toggling this fades the beam in and out.
        type: boolean
        default: true
        optional: true

    -   name: brightness
        description: Brightness multiplier for the glow effect. Defaults to a tuned value per variant and theme.
        type: number
        optional: true

    -   name: color-variant
        description: The color palette of the beam.
        type: [ '"colorful"', '"mono"', '"ocean"', '"sunset"' ]
        default: colorful
        optional: true

    -   name: duration
        description: The animation cycle length in seconds.
        type: number
        default: 1.96 (md / sm), 3.1 (line) or 2.3 (pulse)
        optional: true

    -   name: hue-range
        description: Hue rotation range in degrees for the hue-shift animation.
        type: number
        default: 30
        optional: true

    -   name: radius
        description: The border radius of the beam. If none is given, the radius is inherited.
        type: [ number, string, undefined ]
        default: undefined
        optional: true

    -   name: saturation
        description: Saturation multiplier for the glow effect. Defaults to a tuned value per variant and theme.
        type: number
        optional: true

    -   name: static-colors
        description: Disables the hue-shift animation for static colors. The mono palette is always static.
        type: boolean
        default: false
        optional: true

    -   name: strength
        description: Overall strength of the effect, between 0 and 1. Only affects the beam, glow and bloom layers, not the content.
        type: number
        default: 1
        optional: true

    -   name: variant
        description: The size/type preset. The rotate family (sm, md) travels around the element, line travels along the bottom edge and the pulse family breathes without rotation.
        type: [ '"sm"', '"md"', '"line"', '"pulse-inner"', '"pulse-outside"' ]
        default: md
        optional: true

slots:
    -   name: default
        description: The element that should receive the border beam.
---

# Border beam

This component adds a traveling or breathing glow animation around any element — cards, buttons, inputs or panes. The wrapped element is clipped to the beam's radius and three layers are rendered on top of it: the beam stroke, an inner glow and a soft bloom. Colors adapt to light and dark mode and slowly shift hue over time.

::: render
render=../../code/components/visual/border-beam/preview.vue
:::

The beam pauses automatically when it is scrolled offscreen. The pulse variants are driven by a single shared animation loop that is capped at ~30fps and respect `prefers-reduced-motion`.

<FrontmatterDocs/>

## Examples

::: example Button || Use the compact sm variant on buttons to guide the user to important actions.
example=../../code/components/visual/border-beam/button.vue
:::

::: example Pane || Use the md variant on panes to highlight new or prominent features.
example=../../code/components/visual/border-beam/pane.vue
:::

::: example Line || The line variant renders a traveling glow along the bottom edge, ideal for inputs and search bars.
example=../../code/components/visual/border-beam/line.vue
:::

::: example Pulse || The pulse variants breathe instead of rotate. Pulse-inner stays contained within the element, while pulse-outside blooms outward and requires an opaque child.
example=../../code/components/visual/border-beam/pulse.vue
:::

::: example Palettes || Four color palettes are available: colorful, mono, ocean and sunset.
example=../../code/components/visual/border-beam/palettes.vue
:::
