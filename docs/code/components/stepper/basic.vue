<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxStepper v-model="step">
                <FluxStepperStep class="mt">
                    <h2>1. Your details</h2>
                    <p>[[ form ]]</p>
                </FluxStepperStep>

                <FluxStepperStep class="mt">
                    <h2>2. Company details</h2>
                    <p>[[ form ]]</p>
                </FluxStepperStep>

                <FluxStepperStep class="mt">
                    <h2>3. Validation</h2>
                    <p>[[ form ]]</p>
                </FluxStepperStep>
            </FluxStepper>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxSecondaryButton
                :disabled="step === 0"
                label="Back"
                @click="step--"/>

            <FluxPrimaryButton
                :disabled="step === 2"
                icon-before="circle-check"
                label="Next"
                @click="step++"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStepper, FluxStepperStep } from '@flux-ui/components';
    import { ref } from 'vue';

    const step = ref(0);
</script>

<style
    scoped
    lang="css">
    h2 {
        margin-top: 0;
        border-top: none;
    }
</style>
