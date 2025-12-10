<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxButtonStack direction="vertical">
                <FluxSecondaryButton
                    label="More info"/>

                <FluxSpacing
                    class="spacing-example"
                    :size="10"/>

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
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSpacing } from '@flux-ui/components';
</script>
