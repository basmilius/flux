<template>
    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap">
        <FluxSkeleton
            variant="circle"
            :width="56"
            :height="56"/>

        <FluxSkeleton
            variant="text"
            :width="120"/>

        <FluxSkeleton
            variant="rectangle"
            :width="120"
            :height="72"/>

        <FluxSkeleton
            variant="rounded"
            :width="120"
            :height="72"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxSkeleton } from '@flux-ui/components';
</script>
