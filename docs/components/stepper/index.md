---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the visible view changes.
        type: [ number ]

props:
    -   name: model-value
        description: The index of the current step.
        type: number
        optional: true
        default: 0

slots:
    -   name: default
        description: The content of each step. Each child is treated as a separate step.

    -   name: steps
        description: The steps of the stepper.
        type:
            activate: '(index: number): void'
            modelValue: number
            steps: number

    -   name: content
        description: The content of the current step.
        type:
            activate: '(index: number): void'
            children: VNode[]
            isTransitioningBack: boolean
            modelValue: number
            steps: number
            view: VNode
---

# Stepper

Steppers serve as a user-friendly navigation tool, expertly guiding individuals through a process via clearly marked numbered steps, fostering a seamless and intuitive progression.

::: render
render=../../code/components/stepper/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic stepper.
example=../../code/components/stepper/basic.vue
:::

::: example Custom steps || Override the `steps` slot to render labelled buttons instead of the default dot indicator.
example=../../code/components/stepper/custom-steps.vue
:::

## Used components

- [Stepper](../stepper)
    - [Steps](../stepper/steps)
- [Dynamic view](../dynamic-view)
