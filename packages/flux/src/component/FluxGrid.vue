<template>
    <div
        :class="styles.grid"
        :style="{
            '--gap': `${gap}px`,
            '--columns': columns
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Grid.module.scss';

    export type Props = {
        readonly columns?: number;
        readonly gap?: number;
    };

    withDefaults(defineProps<Props>(), {
        columns: 12,
        gap: 30
    });
</script>
