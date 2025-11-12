<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxButtonStack>
                    <FluxSecondaryButton
                        label="More info"/>

                    <FluxSpacing
                        class="spacing-example"
                        :size="17"/>

                    <FluxSecondaryButton
                        label="Cancel"/>

                    <FluxPrimaryButton
                        icon-leading="circle-check"
                        label="Save"/>
                </FluxButtonStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSpacing } from '@flux-ui/components';
</script>
