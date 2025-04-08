<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxFormField label="Email">
                        <FluxFormInput
                            auto-complete="email"
                            placeholder="E.g. email@example.com"
                            type="email"/>
                    </FluxFormField>

                    <FluxFormField label="Password">
                        <FluxFormInput
                            auto-complete="current-password"
                            type="password"/>
                    </FluxFormField>

                    <FluxButtonStack direction="vertical">
                        <FluxPrimaryButton
                            icon-leading="circle-check"
                            is-filled
                            label="Sign in"/>

                        <FluxSecondaryButton
                            is-filled
                            label="Create account"/>

                        <FluxSecondaryButton
                            is-filled
                            label="Forgot password?"/>
                    </FluxButtonStack>
                </FluxFormColumn>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/flux';
</script>
