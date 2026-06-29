<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxInfoStack>
                <FluxInfo
                    color="info"
                    icon="circle-info">
                    Your changes are saved automatically as you type.
                </FluxInfo>

                <FluxInfo
                    color="success"
                    icon="circle-check">
                    The invoice was sent to the customer.
                </FluxInfo>

                <FluxInfo
                    color="warning"
                    icon="circle-exclamation">
                    This action cannot be undone once confirmed.
                </FluxInfo>
            </FluxInfoStack>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxInfo, FluxInfoStack, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
