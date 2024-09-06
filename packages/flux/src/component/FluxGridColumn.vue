<template>
    <div
        :class="styles.gridColumn"
        :style="{
            gridColumn: `span ${span}`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { useBreakpoints } from '@/composable';
    import styles from '@/css/component/Grid.module.scss';

    const {
        xs,
        sm,
        md,
        lg,
        xl
    } = defineProps<{
        readonly xs?: number;
        readonly sm?: number;
        readonly md?: number;
        readonly lg?: number;
        readonly xl?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const {breakpoint} = useBreakpoints();

    const spans = computed(() => {
        const values = {xs, sm, md, lg, xl};

        values.xs ??= 12;
        values.sm ??= values.xs;
        values.md ??= values.sm;
        values.lg ??= values.md;
        values.xl ??= values.lg;

        return values;
    });

    const span = computed(() => unref(spans)[unref(breakpoint)]);
</script>
