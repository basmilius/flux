<template>
    <FluxProgressBar
        status="Downloading..."
        :value="0.5"/>
</template>

<script
    setup
    lang="ts">
    import { FluxProgressBar } from '@fancee/flux';
</script>
