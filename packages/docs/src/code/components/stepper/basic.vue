<template>
    <flux-pane>
        <flux-pane-body>
            <flux-stepper :model-value="step">
                <flux-stepper-step class="mt">
                    <h2>1. Your details</h2>
                    <p>[[ form ]]</p>
                </flux-stepper-step>

                <flux-stepper-step class="mt">
                    <h2>2. Company details</h2>
                    <p>[[ form ]]</p>
                </flux-stepper-step>

                <flux-stepper-step class="mt">
                    <h2>3. Validation</h2>
                    <p>[[ form ]]</p>
                </flux-stepper-step>
            </flux-stepper>
        </flux-pane-body>

        <flux-pane-footer>
            <flux-spacer/>

            <flux-secondary-button
                :disabled="step === 0"
                label="Back"
                @click="step--"/>

            <flux-primary-button
                :disabled="step === 2"
                icon-before="circle-check"
                label="Next"
                @click="step++"/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxPane,
        FluxPaneBody,
        FluxPaneFooter,
        FluxPrimaryButton,
        FluxSecondaryButton,
        FluxSpacer,
        FluxStepper,
        FluxStepperStep
    } from '@fancee/flux';
    import { ref } from 'vue';

    const step = ref(0);
</script>

<style
    lang="scss"
    scoped>
    .mt {
        margin-top: 21px;
    }
</style>
