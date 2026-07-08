---
outline: deep

emits:
    -   name: activate
        description: Triggered when step is clicked
        type: [ number ]

props:
    -   name: amount
        description: The amount of steps.
        type: number

    -   name: current
        description: The current step.
        type: number

requiredIcons:
    - check
---

# Stepper steps
The stepper steps component displays the list of steps available in the stepper, showing users where they are in the overall process. It acts as a navigation layer, allowing users to understand their current position and progress while also offering a clear overview of what comes next.

::: render
render=../../code/components/stepper/steps/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic stepper steps.
example=../../code/components/stepper/steps/basic.vue
:::

::: example Progress states || The `current` prop drives the active step; completed steps show a check.
example=../../code/components/stepper/steps/progress.vue
:::

::: example Two steps || A minimal stepper with only two steps.
example=../../code/components/stepper/steps/two-steps.vue
:::

## Used components

- [Icon](../icon)
