---
outline: deep

slots:
    -   name: default
        description: The content of the step.
---

# Stepper step

The stepper step represents an individual step within the stepper. It contains the content, actions, and guidance needed for that part of the process. Each FluxStepperStep helps users focus on one task at a time, making multi-step workflows feel clear and manageable.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/guide/components/stepper/step/snippet.vue [StepperStep.vue]

:::

## Usage

Each step is placed inside a [Stepper steps](./steps) component. The step's content is only rendered when the corresponding step is active.

```vue
<FluxStepper v-model="currentStep">
    <FluxStepperSteps>
        <FluxStepperStep>
            <p>Content for the first step.</p>
        </FluxStepperStep>

        <FluxStepperStep>
            <p>Content for the second step.</p>
        </FluxStepperStep>
    </FluxStepperSteps>
</FluxStepper>
```

## Used components

- [Stepper](./index)
- [Stepper steps](./steps)
