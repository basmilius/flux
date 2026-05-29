<template>
    <FluxPressable
        component-type="link"
        href="https://flux-ui.dev"
        target="_blank"
        rel="noopener noreferrer">
        <FluxPane>
            <FluxPaneBody>
                External link to flux-ui.dev
            </FluxPaneBody>
        </FluxPane>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPressable } from '@flux-ui/components';
</script>
