<template>
    <FluxNotice
        icon="circle-exclamation"
        is-small
        message="Your account currently has no active subscriptions."
        variant="warning"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@basmilius/flux';
</script>
