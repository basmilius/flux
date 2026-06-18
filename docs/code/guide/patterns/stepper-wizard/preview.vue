<template>
    <Preview>
        <FluxPane style="width: min(100%, 540px)">
            <FluxPaneHeader title="Set up your workspace"/>

            <FluxPaneBody>
                <FluxStepper v-model="current">
                    <FluxStepperStep>
                        <FluxFormField label="Workspace name">
                            <FluxFormInput
                                v-model="name"
                                placeholder="E.g. Acme Inc."/>
                        </FluxFormField>
                    </FluxStepperStep>

                    <FluxStepperStep>
                        <FluxFormField
                            label="Invite teammates"
                            hint="Press enter after each address.">
                            <FluxFormTagsInput
                                v-model="invites"
                                placeholder="email@example.com"/>
                        </FluxFormField>
                    </FluxStepperStep>

                    <FluxStepperStep>
                        <FluxFlex
                            align="center"
                            direction="vertical"
                            :gap="9"
                            style="padding: 18px 0">
                            <FluxIcon
                                name="circle-check"
                                :size="32"/>

                            <strong>You're all set!</strong>
                        </FluxFlex>
                    </FluxStepperStep>
                </FluxStepper>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    :disabled="current === 0"
                    icon-leading="angle-left"
                    label="Back"
                    @click="current--"/>

                <FluxSpacer/>

                <FluxPrimaryButton
                    v-if="current < 2"
                    label="Continue"
                    @click="current++"/>

                <FluxPrimaryButton
                    v-else
                    icon-leading="circle-check"
                    label="Finish"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxFormField, FluxFormInput, FluxFormTagsInput, FluxIcon, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStepper, FluxStepperStep } from '@flux-ui/components';
    import { ref } from 'vue';

    const current = ref(0);
    const name = ref('');
    const invites = ref<string[]>([]);
</script>
