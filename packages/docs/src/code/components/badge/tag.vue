<template>
    <flux-badge-stack>
        <flux-badge
            is-tag
            label="Online"/>

        <flux-badge
            is-deletable
            is-tag
            label="Boot failure"/>
    </flux-badge-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@fancee/flux';
</script>
