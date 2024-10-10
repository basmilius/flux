<template>
    <FluxNotice
        icon="circle-exclamation"
        title="Not activated"
        message="Your account is not yet activated, please check your email to activate it."
        variant="gray"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@basmilius/flux';
</script>
