<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                icon="circle-exclamation"
                title="Confirm"/>

            <FluxPaneBody>
                <p>Are you sure you want to proceed with this action?</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxSecondaryButton label="Cancel"/>

                <FluxPrimaryButton
                    icon-leading="circle-check"
                    label="Ok"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
</script>
