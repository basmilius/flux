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
render=../../code/guide/components/fader/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple and basic fader.
example=../../code/guide/components/fader/basic.vue
:::
