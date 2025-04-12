<template>
    <div :class="isInset ? $style.paneMediaInset : $style.paneMedia">
        <img
            v-if="imageUrl"
            :class="$style.paneMediaImage"
            :style="{
                objectPosition: `${focalPointX}% ${focalPointY}%`
            }"
            :src="imageUrl"
            :alt="imageAlt">
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import $style from '$flux/css/component/Pane.module.scss';

    const {
        imageFocalPoint
    } = defineProps<{
        readonly imageAlt?: string;
        readonly imageFocalPoint?: [number, number];
        readonly imageUrl?: string;
        readonly isInset?: boolean;
    }>();

    const focalPointX = computed(() => imageFocalPoint?.[0] ?? 50);
    const focalPointY = computed(() => imageFocalPoint?.[1] ?? 50);
</script>
