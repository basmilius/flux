<template>
    <img
        class="flux-focal-point-image"
        :style="{
            objectPosition: `${x}% ${y}%`
        }"
        :src="src"
        :alt="alt"/>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import type { FluxFocalPoint } from '@/data';

    export interface Props {
        readonly focalPoint?: FluxFocalPoint | null;
        readonly alt?: string;
        readonly src: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        alt: '',
        focalPoint: null
    });

    const x = computed(() => props.focalPoint?.x ?? 50);
    const y = computed(() => props.focalPoint?.y ?? 50);
</script>

<style lang="scss">
    .flux-focal-point-image {
        object-fit: cover;
    }
</style>
