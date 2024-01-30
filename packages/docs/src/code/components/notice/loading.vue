<template>
    <FluxNotice
        icon="circle-exclamation"
        is-loading
        is-small
        message="Sending newsletters..."
        variant="info"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@fancee/flux';
</script>
