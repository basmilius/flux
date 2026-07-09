<template>
    <FluxPane style="max-width: 390px">
        <FluxClickablePaneHeader
            type="link"
            disabled
            icon="lock"
            title="Restricted section"
            sub-title="You don't have access"
            href="#"/>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePaneHeader, FluxPane } from '@flux-ui/components';
</script>
