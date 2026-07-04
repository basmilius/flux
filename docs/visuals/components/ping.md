---
outline: deep

props:
    -   name: color
        description: The color of the dot and its ping, mapped to the matching Flux color token.
        type: [ '"gray"', '"primary"', '"danger"', '"info"', '"success"', '"warning"' ]
        default: success
        optional: true

    -   name: size
        description: The diameter of the dot in pixels.
        type: number
        default: 9
        optional: true

    -   name: duration
        description: The length of one ping cycle in seconds.
        type: number
        default: 1.4
        optional: true
---

# Ping

A radar-style status dot that emits expanding, fading rings behind a solid center. Ideal for live, online or realtime indicators on dashboards. The effect is purely decorative, so it is marked `aria-hidden` and pairs well with a text label.

::: render
render=../../code/visuals/ping/preview.vue
:::

The rings are driven entirely by CSS keyframes. When `prefers-reduced-motion` is set the rings are removed and only the solid dot remains.

<FrontmatterDocs/>

## Examples

::: example Statuses || Combine differently colored pings with a label to build a compact service status list.
example=../../code/visuals/ping/statuses.vue
:::
