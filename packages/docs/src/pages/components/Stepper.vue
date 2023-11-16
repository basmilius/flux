<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Stepper"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxStepper :model-value="step - 1">
                        <FluxStepperStep v-for="_ of max"/>
                    </FluxStepper>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Steppers serve as a user-friendly navigation tool, expertly guiding individuals through a process
                via clearly marked numbered steps, fostering a seamless and intuitive progression.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxStepper</code></td>
                    <td>This component does all the "stepper"-work for you. It may contain multiple FluxStepperStep components. The component will render a FluxStepperSteps for you.</td>
                </tr>
                <tr>
                    <td><code>FluxStepperStep</code></td>
                    <td>A single step within a FluxStepper component.</td>
                </tr>
                <tr>
                    <td><code>FluxStepperSteps</code></td>
                    <td>A navigation stack that displays the available steps within a FluxStepperStep.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Stepper">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>number</code></td>
                        <td>The index of the current active stepper view.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>activate</code><code>(index: number): void</code></td>
                        <td>Triggered when a step is clicked.</td>
                    </tr>
                    <tr>
                        <td><code>update:model-value</code><code>(index: number): void</code></td>
                        <td>Triggered when a step has actually changed.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>content</code><code>{activate, activeIndex, children, isTransitioningBack, steps, view}</code></td>
                        <td>The content of the current step.</td>
                    </tr>
                    <tr>
                        <td><code>steps</code><code>{activate, activeIndex, steps}</code></td>
                        <td>The steps that are visible in the stepper.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="StepperStep">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The content of the step.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="StepperSteps">
                <template #props>
                    <tr>
                        <td><code>amount</code><code>number</code></td>
                        <td>The amount of steps that should be visible.</td>
                    </tr>
                    <tr>
                        <td><code>current</code><code>number</code></td>
                        <td>The current step.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>activate</code><code>(index: number): void</code></td>
                        <td>Triggered when a step is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic stepper that steps through a few steps."/>

            <ApiExample
                :code="customCode"
                :component="custom"
                title="Custom"
                description="A stepper that is placed in a custom structure."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxStack, FluxStepper, FluxStepperStep } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import { ref } from 'vue';
    import basic from '@docs/code/components/stepper/basic.vue';
    import basicCode from '@docs/code/components/stepper/basic.vue?raw';
    import custom from '@docs/code/components/stepper/custom.vue';
    import customCode from '@docs/code/components/stepper/custom.vue?raw';

    const max = ref(3);
    const step = ref(2);
</script>
