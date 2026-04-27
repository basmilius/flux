<template>
    <Preview>
        <FluxClickablePane
            type="link"
            href="https://flux-ui.dev"
            target="_blank"
            rel="noopener"
            style="width: 280px">
            <FluxPaneBody>
                <FluxStack :gap="3">
                    <strong>Flux UI</strong>
                    <span style="font-size: .875rem; opacity: .6">Open the documentation in a new tab.</span>
                </FluxStack>
            </FluxPaneBody>
        </FluxClickablePane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePane, FluxPaneBody, FluxStack } from '@flux-ui/components';
</script>
