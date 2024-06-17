<template>
    <FluxBadgeStack>
        <FluxBadge
            color="success"
            icon="circle-check"
            label="Complete"/>

        <FluxBadge
            color="warning"
            icon="circle-exclamation"
            label="Missing payment details"/>
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
