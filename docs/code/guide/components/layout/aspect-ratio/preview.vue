<template>
    <Preview>
        <FluxAspectRatio :aspect-ratio="16 / 9">
            <FluxPane :class="$style.aspectRatioPaneAnimation"/>
        </FluxAspectRatio>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane } from '@basmilius/flux';
</script>

<style module>
    .aspectRatioPaneAnimation {
        animation: aspect-ratio-width 1s var(--swift-out) alternate infinite;
    }

    @keyframes aspect-ratio-width {
        from { width: 240px; }
        to { width: 360px; }
    }
</style>
