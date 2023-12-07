<template>
    <div
        :class="isInset ? styles.paneMediaInset : styles.paneMedia"
        :style="{'--span': span}">
        <img
            v-if="imageUrl"
            :class="styles.paneMediaImage"
            :src="imageUrl"
            :alt="imageAlt"
            :style="{
                '--focal-point-x': `${imageFocalPoint?.[0] ?? 50}%`,
                '--focal-point-y': `${imageFocalPoint?.[1] ?? 50}%`
            }">
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Pane.module.scss';

    export interface Props {
        readonly imageAlt?: string;
        readonly imageFocalPoint?: [number, number];
        readonly imageUrl?: string;
        readonly isInset?: boolean;
        readonly span?: number;
    }

    withDefaults(defineProps<Props>(), {
        span: 1
    });
</script>
