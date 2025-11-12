<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxPlaceholder
                    icon="files"
                    title="Invoices"
                    message="Add new invoices">
                    <FluxSecondaryButton label="Add invoice"/>
                </FluxPlaceholder>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPlaceholder, FluxSecondaryButton } from '@flux-ui/components';
</script>
