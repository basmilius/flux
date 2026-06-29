<template>
    <FluxPane style="max-width: 441px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Account security">
                    <FluxFormCheckboxGroup v-model="settings">
                        <FluxFormCheckboxTile
                            value="two-factor"
                            icon="lock"
                            label="Two-factor authentication"
                            sub-label="Require a verification code when signing in."/>

                        <FluxFormCheckboxTile
                            value="alerts"
                            icon="bell"
                            label="Login alerts"
                            sub-label="Email me about sign-ins from new devices."/>

                        <FluxFormCheckboxTile
                            value="trusted"
                            icon="laptop"
                            label="Trusted devices"
                            sub-label="Skip extra checks on devices you mark as trusted."/>
                    </FluxFormCheckboxGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormCheckboxGroup, FluxFormCheckboxTile, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const settings = ref(['two-factor']);
</script>
