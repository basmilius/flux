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

    const {
        gap = 30
    } = defineProps<{
        readonly gap?: number;
        readonly minColumnWidth: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
