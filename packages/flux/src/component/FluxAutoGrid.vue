<template>
    <div
        :class="styles.autoGrid"
        :style="{
            gap: `${gap}px`,
            '--min-column-width': minColumnWidth
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Layout.module.scss';

    export type Props = {
        readonly gap?: number;
        readonly minColumnWidth: number;
    };

    withDefaults(defineProps<Props>(), {
        gap: 30
    });
</script>
