<template>
    <flux-badge-stack>
        <flux-badge
            is-tag
            label="Tag"/>

        <flux-badge
            is-deletable
            is-tag
            label="Removable tag"/>
    </flux-badge-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@fancee/flux';
</script>
