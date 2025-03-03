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

# Stepper

Steppers serve as a user-friendly navigation tool, expertly guiding individuals through a process via clearly marked numbered steps, fostering a seamless and intuitive progression.

::: render
render=../../code/guide/components/stepper/preview.vue
:::

<FrontmatterDocs/>

## Examples

Todo
