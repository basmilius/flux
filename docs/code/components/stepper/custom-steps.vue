<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxStepper v-model="step">
                <template #steps="{activate, modelValue, steps}">
                    <FluxFlex
                        :gap="9"
                        style="width: 100%">
                        <FluxSecondaryButton
                            v-for="index in steps"
                            :key="index - 1"
                            :label="`${index}. ${titles[index - 1]}`"
                            :is-filled="(index - 1) === modelValue"
                            @click="activate(index - 1)"/>
                    </FluxFlex>
                </template>

                <FluxStepperStep class="mt">
                    <h2>{{ titles[0] }}</h2>
                    <p>Tell us a bit about yourself.</p>
                </FluxStepperStep>

                <FluxStepperStep class="mt">
                    <h2>{{ titles[1] }}</h2>
                    <p>Configure the workspace settings.</p>
                </FluxStepperStep>

                <FluxStepperStep class="mt">
                    <h2>{{ titles[2] }}</h2>
                    <p>You're all set.</p>
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
    import { FluxFlex, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStepper, FluxStepperStep } from '@flux-ui/components';
    import { ref } from 'vue';

    const step = ref(0);
    const titles = ['Profile', 'Workspace', 'Done'];
</script>

<style
    scoped
    lang="css">
    h2 {
        margin-top: 0;
        border-top: none;
    }
</style>
