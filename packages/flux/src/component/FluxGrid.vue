<template>
    <div
        :class="styles.grid"
        :style="{
            '--columns': `${columns}`,
            '--gap': `${gap}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        readonly columns?: number;
        readonly gap?: number;
    }

    withDefaults(defineProps<Props>(), {
        columns: 12,
        gap: 30
    });
</script>
