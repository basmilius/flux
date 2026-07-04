---
outline: deep

props:
    -   name: animated
        description: Whether the grain jitters between frames for a film-like effect.
        type: boolean
        default: false
        optional: true

    -   name: blend
        description: The blend mode used to composite the grain over the surface.
        type: "normal | multiply | screen | overlay | soft-light | plus-lighter"
        default: overlay
        optional: true

    -   name: opacity
        description: The opacity of the grain.
        type: number
        default: 0.05
        optional: true
---

# Noise

A subtle film-grain overlay that adds texture to panes and hero areas. Use it as a fill element inside a relatively positioned container; it sits on top with pointer events disabled and blends into the surface below.

::: render
render=../../code/visuals/noise/preview.vue
:::

The grain is generated from an inline SVG turbulence filter, so there is nothing to download. The animated variant snaps between a handful of positions with a stepped animation instead of a per-frame script, and always falls back to a static grain when reduced motion is requested.

<FrontmatterDocs/>

## Examples

::: example Animated || Add lively, cinematic movement with jittering grain.
example=../../code/visuals/noise/animated.vue
:::

::: example Paper || A multiply blend turns the grain into a faint printed texture.
example=../../code/visuals/noise/paper.vue
:::
