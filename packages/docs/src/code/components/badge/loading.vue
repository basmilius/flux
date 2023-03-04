<template>
    <flux-badge-stack>
        <flux-badge
            is-loading
            label="Pending"/>

        <flux-badge
            is-loading
            label="Saving"/>
    </flux-badge-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@fancee/flux';
</script>
