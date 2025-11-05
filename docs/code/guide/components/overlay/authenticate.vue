<template>
    <FluxDestructiveButton
        icon-leading="lock"
        label="Re-authenticate"
        @click="isOpen = true"/>

    <FluxOverlay size="small">
        <FluxPane v-if="isOpen">
            <FluxForm>

                <FluxPaneBody>
                    <h2>You've been signed out.</h2>
                </FluxPaneBody>

                <FluxPaneBody>
                    <p>To continue using your account, please sign in again using your password.</p>
                </FluxPaneBody>

                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField label="Username">
                            <FluxFormInput type="email" model-value="bas@flux-ui.dev" disabled is-readonly/>
                        </FluxFormField>

                        <FluxFormField label="Password">
                            <FluxFormInput type="password" model-value="12345678"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxButtonStack
                        is-fill
                        direction="vertical">
                        <FluxPrimaryButton
                            icon-trailing="user-key"
                            label="Sign in"/>
                        <FluxSecondaryButton
                            label="Cancel"
                            @click="isOpen = false"/>
                    </FluxButtonStack>
                </FluxPaneFooter>
            </FluxForm>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonStack, FluxDestructiveButton, FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isOpen = ref(false);
</script>
