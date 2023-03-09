<template>
    <flux-badge-stack>
        <flux-badge
            color="success"
            icon="circle-check"
            label="Complete"/>

        <flux-badge
            color="warning"
            icon="circle-exclamation"
            label="Missing payment details"/>
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
