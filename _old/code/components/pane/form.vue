<template>
    <FluxPane style="max-width: 360px">
        <FluxPaneBody>
            <FluxFormColumn>
                <h2>Sign in</h2>

                <FluxNotice
                    icon="circle-exclamation"
                    is-small
                    message="Invalid email and/or password."
                    variant="warning"/>

                <FluxFormField label="Email">
                    <FluxFormInput
                        placeholder="bas@mili.us"
                        type="email"/>
                </FluxFormField>

                <FluxFormField label="Password">
                    <FluxFormInput type="password"/>
                </FluxFormField>
            </FluxFormColumn>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxButtonStack
                axis="vertical"
                is-fill>
                <FluxPrimaryButton
                    icon-before="circle-check"
                    label="Sign in"/>

                <FluxSecondaryButton
                    icon-after="circle-arrow-right"
                    label="Create an account"/>
            </FluxButtonStack>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFormColumn, FluxFormField, FluxFormInput, FluxNotice, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSecondaryButton } from '@basmilius/flux';
</script>
