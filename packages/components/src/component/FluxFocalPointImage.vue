<template>
    <img
        :class="$style.focalPointImage"
        :style="{
            objectPosition: `${x}% ${y}%`
        }"
        :src="src"
        :alt="alt"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFocalPointObject } from '@flux-ui/types';
    import { computed } from 'vue';
    import $style from '$flux/css/component/FocalPoint.module.scss';

    const {
        alt = '',
        focalPoint
    } = defineProps<{
        readonly focalPoint?: FluxFocalPointObject;
        readonly alt?: string;
        readonly src: string;
    }>();

    const x = computed(() => focalPoint?.x ?? 50);
    const y = computed(() => focalPoint?.y ?? 50);
</script>
