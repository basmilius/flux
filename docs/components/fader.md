---
outline: deep

emits:
    -   name: update
        description: Triggered when the visible view changes.
        type: [ number ]

props:
    -   name: interval
        description: The time a view is visible in milliseconds.
        type: number
        default: 9000
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

<FrontmatterDocs/>

## Examples

::: example Basic || A simple and basic fader.
example=../code/components/fader/basic.vue
:::

::: example Manual navigation || Slot bindings expose `next` and `previous` so you can drive the fader from your own controls.
example=../code/components/fader/manual.vue
:::

## Used components

- [Fader item](./fader-item)
