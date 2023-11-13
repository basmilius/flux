<template>
    <div
        :class="styles.autoGrid"
        :style="{
            '--gap': `${gap}px`,
            '--min-column-width': `${minColumnWidth}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        readonly gap?: number;
        readonly minColumnWidth: number;
    }

    withDefaults(defineProps<Props>(), {
        gap: 30
    });
</script>
