<template>
    <div
        :class="{
            [styles.paneBody]: true,
            [styles.paneBodyContentCentered]: isContentCentered,
            [styles.paneBodyLargerPadded]: isLargerPadded
        }"
        :style="{
            '--gap': `${gap}px`,
            '--span': span
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Pane.module.scss';

    export interface Props {
        readonly gap?: number;
        readonly isContentCentered?: boolean;
        readonly isLargerPadded?: boolean;
        readonly span?: number;
    }

    withDefaults(defineProps<Props>(), {
        gap: 0,
        span: 1
    });
</script>
