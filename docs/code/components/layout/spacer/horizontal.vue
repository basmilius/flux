<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxButtonStack>
                <FluxSecondaryButton
                    label="More info"/>

                <FluxSpacer class="spacer-example"/>

                <FluxSecondaryButton
                    label="Cancel"/>

                <FluxPrimaryButton
                    icon-leading="circle-check"
                    label="Save"/>
            </FluxButtonStack>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
</script>
