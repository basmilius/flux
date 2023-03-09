<template>
    <flux-badge-stack>
        <flux-badge
            color="success"
            dot
            label="Online"/>

        <flux-badge
            color="danger"
            dot
            label="Boot failure"/>

        <flux-badge
            color="warning"
            dot
            label="Payment in progress"/>
    </flux-badge-stack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxBadge,
        FluxBadgeStack
    } from '@fancee/flux';
</script>
