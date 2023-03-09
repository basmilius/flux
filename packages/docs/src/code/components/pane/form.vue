<template>
    <flux-pane style="max-width: 360px">
        <flux-pane-body>
            <flux-form-column>
                <h2>Sign in</h2>

                <flux-notice
                    icon="circle-exclamation"
                    is-small
                    message="Invalid email and/or password."
                    variant="warning"/>

                <flux-form-field label="Email">
                    <flux-form-input
                        placeholder="bas@mili.us"
                        type="email"/>
                </flux-form-field>

                <flux-form-field label="Password">
                    <flux-form-input type="password"/>
                </flux-form-field>
            </flux-form-column>
        </flux-pane-body>
        <flux-pane-footer>
            <flux-button-stack
                axis="vertical"
                is-fill>
                <flux-primary-button
                    icon-before="circle-check"
                    label="Sign in"/>

                <flux-secondary-button
                    icon-after="circle-arrow-right"
                    label="Create an account"/>
            </flux-button-stack>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxButtonStack,
        FluxFormColumn,
        FluxFormField,
        FluxFormInput,
        FluxNotice,
        FluxPane,
        FluxPaneBody,
        FluxPaneFooter,
        FluxPrimaryButton,
        FluxSecondaryButton
    } from '@fancee/flux';
</script>
