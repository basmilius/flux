<template>
    <FluxTagStack>
        <FluxTag
            color="success"
            dot
            label="Online"/>

        <FluxTag
            color="danger"
            dot
            label="Boot failure"/>

        <FluxTag
            color="warning"
            dot
            label="Payment in progress"/>
    </FluxTagStack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxTag,
        FluxTagStack
    } from '@basmilius/flux';
</script>
