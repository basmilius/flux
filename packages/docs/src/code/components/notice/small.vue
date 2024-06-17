<template>
    <FluxNotice
        icon="circle-exclamation"
        is-small
        message="The Birthdate field is required because your event has a minimum age."
        variant="warning"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@basmilius/flux';
</script>
