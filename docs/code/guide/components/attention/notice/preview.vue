<template>
    <Preview>
        <FluxNotice
            icon="circle-exclamation"
            message="Please note that this is a warning message."
            variant="warning"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@basmilius/flux';
</script>
