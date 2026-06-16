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

    -   name: root
        description: Container the step targets are resolved within. Useful when multiple tours share selectors on one page. Defaults to the document.
        type: string | HTMLElement | (() => HTMLElement | null)
        optional: true

slots:
    -   name: default
        description: The steps of the tour, provided as Tour Item components.
---

# Tour

The Tour component guides users through a sequence of steps, highlighting a target element with a spotlight and showing a popover next to it. Steps are declared with [Tour Item](#tour-item) components. It is controlled through `v-model:active` and `v-model:step`. While active, the rest of the page is dimmed and not interactive and Escape skips the tour.

::: render
render=../code/components/tour/preview.vue
:::

::: tip
Each step's `target` is a CSS selector or a function returning an element. Make sure the target exists in the DOM when its step becomes active.
:::

<FrontmatterDocs/>

## Tour Item

Each step of the tour is a `FluxTourItem`. It targets an element through the `target` prop, optionally shows a `title`, and renders its default slot as the step content.

| Prop       | Type                                       | Description                                                                 |
|------------|--------------------------------------------|-----------------------------------------------------------------------------|
| `target`   | `string \| (() => HTMLElement \| null)`    | A CSS selector or getter for the element this step highlights.               |
| `title`    | `string`                                   | The optional title shown at the top of the step.                            |
| `position` | `FluxTourPosition`                         | The optional position of the popover relative to the target. Defaults to `bottom`. |

The default slot holds the step content.

## Examples

::: example Basic || A three-step product tour.
example=../code/components/tour/preview.vue
:::

::: example Positions || Control where each popover appears with the position prop.
example=../code/components/tour/positions.vue
:::

::: example Custom content || Render any component inside a step through its default slot.
example=../code/components/tour/custom.vue
:::

::: example Rich onboarding || Combine progress, avatars and actions for a richer tour.
example=../code/components/tour/rich.vue
:::

## Used components

- [Pane](./pane/)
- [Button](./button/)
