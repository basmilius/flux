<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxButtonStack>
                    <FluxDestructiveButton
                        label="Delete"/>
                    <FluxSecondaryButton
                        label="More info"/>
                    <FluxSecondaryButton
                        label="Cancel"/>
                    <FluxPrimaryButton
                        label="Save"/>
                </FluxButtonStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonStack, FluxDestructiveButton, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
