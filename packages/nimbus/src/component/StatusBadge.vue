<template>
    <FluxBadge
        :color="meta.color"
        :icon="meta.icon"
        :label="meta.label"
        type="none"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge } from '@flux-ui/components';
    import type { StatusMeta } from '@/util';

    defineProps<{
        readonly meta: StatusMeta;
    }>();
</script>
