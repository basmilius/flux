<template>
    <FluxClickablePane
        type="button"
        tag="Popular"
        style="width: 280px">
        <FluxPaneBody>
            <FluxFlex
                direction="vertical"
                :gap="3">
                <strong>Pro</strong>
                <FluxText
                    size="small"
                    color="muted">
                    For growing teams that need more power and seats.
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
