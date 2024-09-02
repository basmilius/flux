<template>
    <div :class="isInset ? styles.paneMediaInset : styles.paneMedia">
        <img
            v-if="imageUrl"
            :class="styles.paneMediaImage"
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
    import styles from '@/css/component/Pane.module.scss';

    export type Props = {
        readonly imageAlt?: string;
        readonly imageFocalPoint?: [number, number];
        readonly imageUrl?: string;
        readonly isInset?: boolean;
    };

    const props = defineProps<Props>();

    const focalPointX = computed(() => props.imageFocalPoint ? props.imageFocalPoint[0] : 50);
    const focalPointY = computed(() => props.imageFocalPoint ? props.imageFocalPoint[1] : 50);
</script>
