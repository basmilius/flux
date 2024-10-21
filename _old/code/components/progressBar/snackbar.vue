<template>
    <FluxSnackbar
        is-rendered
        progress-status="Fetching information..."
        :progress-value="0.5"
        icon="arrow-down-to-line"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur faucibus tortor, et ornare mauris."
        title="Downloading"/>
</template>

<script
    setup
    lang="ts">
    import { FluxSnackbar } from '@basmilius/flux';
</script>
