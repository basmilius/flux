<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxStepper v-model="step">
                    <FluxStepperStep>Step 1</FluxStepperStep>
                    <FluxStepperStep>Step 2</FluxStepperStep>
                    <FluxStepperStep>Step 3</FluxStepperStep>
                </FluxStepper>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxStepper, FluxStepperStep } from '@flux-ui/components';
    import { ref } from 'vue';

    const step = ref(0);
</script>
