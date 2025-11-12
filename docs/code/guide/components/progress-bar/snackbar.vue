<template>
    <FluxSnackbar
        is-rendered
        progress-status="Fetching Flux packages..."
        :progress-value="0.75"
        icon="arrow-down-to-line"
        message="Downloading the new version of Flux."
        title="Flux update"/>
</template>

<script
    setup
    lang="ts">
    import { FluxSnackbar } from '@flux-ui/components';
</script>
