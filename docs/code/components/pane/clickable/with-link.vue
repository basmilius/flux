<template>
    <FluxClickablePane
        type="link"
        href="https://flux-ui.dev"
        target="_blank"
        rel="noopener noreferrer"
        style="width: 280px">
        <FluxPaneBody>
            <FluxFlex
                direction="vertical"
                :gap="3">
                <strong>Flux UI</strong>
                <span style="font-size: .875rem; opacity: .6">Open the documentation in a new tab.</span>
            </FluxFlex>
        </FluxPaneBody>
    </FluxClickablePane>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePane, FluxFlex, FluxPaneBody } from '@flux-ui/components';
</script>
