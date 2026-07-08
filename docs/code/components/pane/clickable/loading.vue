<template>
    <FluxClickablePane
        type="button"
        is-loading
        style="width: 280px">
        <FluxPaneBody>
            <FluxFlex
                direction="vertical"
                :gap="3">
                <strong>Syncing</strong>
                <FluxText
                    size="small"
                    color="muted">
                    Your changes are being saved.
                </FluxText>
            </FluxFlex>
        </FluxPaneBody>
    </FluxClickablePane>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePane, FluxFlex, FluxPaneBody, FluxText } from '@flux-ui/components';
</script>
