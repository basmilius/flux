<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxStepper :model-value="1">
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
    import { FluxPane, FluxPaneBody, FluxStepper, FluxStepperStep } from '@basmilius/flux';
</script>
