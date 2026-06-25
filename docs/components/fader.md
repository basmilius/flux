---
outline: deep

emits:
    -   name: update
        description: Triggered when the visible view changes.
        type: [ number ]

props:
    -   name: autoplay
        description: Whether the fader automatically advances through its items. Autoplay only runs when there is more than one item.
        type: boolean
        default: true
        optional: true

    -   name: interval
        description: The time a view is visible in milliseconds.
        type: number
        default: 9000
        optional: true

    -   name: is-paused
        description: Pauses autoplay while true. Useful for pausing the fader from outside, for example while a dialog is open.
        type: boolean
        default: false
        optional: true

    -   name: pause-on-hover
        description: Pauses autoplay while the pointer is hovering the fader.
        type: boolean
        default: true
        optional: true

slots:
    -   name: default
        description: The views of the fader.
        type:
            current: number
            next: "(): void"
            previous: "(): void"
---

# Fader

Faders are used to fade between multiple items using a particular interval. They can be used in headers to fade between multiple image slides.

::: render
render=../code/components/fader/preview.vue
:::

::: tip Accessibility
The fader is exposed as a carousel (`role="group"` with `aria-roledescription="carousel"`) and each item as a slide. Inactive slides are marked `aria-hidden`. Autoplay pauses on hover by default (`pause-on-hover`), and you can pause it externally with `is-paused`. Autoplay only runs when there is more than one item.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple and basic fader.
example=../code/components/fader/basic.vue
:::

::: example Autoplay || Autoplay advances the fader on the configured `interval`. With `pause-on-hover` it stops while the pointer is over it.
example=../code/components/fader/autoplay.vue
:::

::: example Manual navigation || Disable autoplay and drive the fader from your own controls. Slot bindings expose `next` and `previous`.
example=../code/components/fader/manual.vue
:::

## Used components

- [Fader item](./fader-item)
