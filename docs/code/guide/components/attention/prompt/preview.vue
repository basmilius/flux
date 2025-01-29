<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                icon="circle-exclamation"
                title="Prompt"/>

            <FluxPaneBody>
                <p>Before this page can be accessed, we need your full name.</p>
            </FluxPaneBody>

            <FluxPaneBody>
                <FluxFormField label="Name">
                    <FluxFormInput
                        ref="input"
                        placeholder="E.g. John Doe"/>
                </FluxFormField>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxSecondaryButton label="Cancel"/>

                <FluxPrimaryButton
                    icon-before="circle-check"
                    label="Ok"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '@basmilius/flux';
</script>
