<template>
    <FluxNotice
        color="danger"
        icon="circle-exclamation"
        title="Not activated"
        message="Your account is not yet activated, please check your email to activate it."/>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@flux-ui/components';
</script>
