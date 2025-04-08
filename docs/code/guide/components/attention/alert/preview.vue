<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                icon="circle-exclamation"
                title="Alert"/>

            <FluxPaneBody>
                <p>Unexpected error occurred. Please try again or contact support if the issue persists.</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

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
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSpacer } from '@flux-ui/flux';
</script>
