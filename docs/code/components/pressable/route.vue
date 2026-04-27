<template>
    <FluxPressable
        component-type="route"
        to="/components/pressable">
        <FluxPane>
            <FluxPaneBody>
                Internal navigation with Vue Router
            </FluxPaneBody>
        </FluxPane>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPressable } from '@flux-ui/components';
</script>
