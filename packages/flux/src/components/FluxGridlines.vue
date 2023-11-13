<template>
    <div
        :class="styles.gridlines"
        :style="{
            '--size': `${size}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Visuals.module.scss';

    export interface Props {
        readonly size: number;
    }

    withDefaults(defineProps<Props>(), {
        size: 30
    });
</script>
