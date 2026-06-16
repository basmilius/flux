---
outline: deep

emits:
    -   name: finish
        description: Triggered when the last step is completed.
        type: []

    -   name: skip
        description: Triggered when the tour is skipped or dismissed with Escape.
        type: []

    -   name: next
        description: Triggered when advancing to the next step, with the new step index.
        type: [ number ]

    -   name: prev
        description: Triggered when going back a step, with the new step index.
        type: [ number ]

props:
    -   name: mask-padding
        description: The padding in pixels around the highlighted element.
        type: number
        optional: true
        default: 8

    -   name: steps
        description: The ordered steps of the tour. Each step targets an element by selector or getter and shows a title and content.
        type: FluxTourStep[]

slots:
    -   name: default
        description: Replaces the default popover content. Receives the current step, index, total, and the next/previous/skip/finish functions.
---

# Tour

The Tour component guides users through a sequence of steps, highlighting a target element with a spotlight and showing a popover next to it. It is controlled through `v-model:active` and `v-model:step`. While active, the rest of the page is dimmed and not interactive, focus is kept in the popover, and Escape skips the tour.

::: render
render=../code/components/tour/preview.vue
:::

::: tip
Each step's `target` is a CSS selector or a function returning an element. Make sure the target exists in the DOM when its step becomes active.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A three-step product tour.
example=../code/components/tour/preview.vue
:::

## Used components

- [Pane](./pane/)
- [Button](./button/)
