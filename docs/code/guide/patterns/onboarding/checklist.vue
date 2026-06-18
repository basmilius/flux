<template>
    <Preview>
        <FluxPane style="max-width: 480px">
            <FluxPaneHeader title="Setup progress"/>

            <FluxPaneBody>
                <FluxFlex
                    direction="vertical"
                    :gap="15">
                    <FluxStepperSteps
                        :amount="steps.length"
                        :current="current + 1"
                        @activate="current = $event"/>

                    <FluxFlex :gap="9">
                        <FluxTooltip
                            v-for="(label, index) in steps"
                            :key="label"
                            :content="label">
                            <FluxSecondaryButton
                                :icon-leading="index <= current ? 'circle-check' : 'circle'"
                                :is-filled="index === current"
                                @click="current = index"/>
                        </FluxTooltip>
                    </FluxFlex>

                    <span style="opacity: .6">
                        Step {{ current + 1 }} of {{ steps.length }} — {{ steps[current] }}
                    </span>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton, FluxStepperSteps, FluxTooltip } from '@flux-ui/components';
    import { ref } from 'vue';

    const current = ref(1);

    const steps = ['Create account', 'Verify email', 'Invite team', 'Connect tools'];
</script>
