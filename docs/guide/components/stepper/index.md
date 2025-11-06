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
            isTransitionBack: boolean
            modelValue: number
            steps: number
            view: VNode
---

# Stepper

Steppers serve as a user-friendly navigation tool, expertly guiding individuals through a process via clearly marked numbered steps, fostering a seamless and intuitive progression.

::: render
render=../../../code/guide/components/stepper/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic stepper.
example=../../../code/guide/components/stepper/basic.vue
:::

## Used components

- [Stepper](../stepper)
    - [Steps](../stepper/steps)
- [Dynamic view](../dynamic-view)
