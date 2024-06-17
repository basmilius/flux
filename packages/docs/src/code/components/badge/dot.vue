<template>
    <FluxBadgeStack>
        <FluxBadge
            color="success"
            dot
            label="Online"/>

        <FluxBadge
            color="danger"
            dot
            label="Boot failure"/>

        <FluxBadge
            color="warning"
            dot
            label="Payment in progress"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxBadge,
        FluxBadgeStack
    } from '@basmilius/flux';
</script>
