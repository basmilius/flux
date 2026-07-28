<template>
    <Component
        :is="tag ?? 'div'"
        :class="$style.masonry"
        :style="{
            '--gap': `${gap}px`,
            '--xs': columnCount.xs,
            '--sm': columnCount.sm,
            '--md': columnCount.md,
            '--lg': columnCount.lg,
            '--xl': columnCount.xl
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { computed, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Masonry.module.scss';

    const {
        columns = 3,
        gap = 15
    } = defineProps<{
        readonly columns?: number | {
            readonly xs?: number;
            readonly sm?: number;
            readonly md?: number;
            readonly lg?: number;
            readonly xl?: number;
        };
        readonly gap?: number;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const columnCount = computed(() => {
        // The shorthand keeps the same floor as the object form: a phone gets one column.
        if (typeof columns === 'number') {
            return {
                xs: 1,
                sm: columns,
                md: columns,
                lg: columns,
                xl: columns
            };
        }

        const xs = columns.xs ?? 1;
        const sm = columns.sm ?? xs;
        const md = columns.md ?? sm;
        const lg = columns.lg ?? md;
        const xl = columns.xl ?? lg;

        return {xs, sm, md, lg, xl};
    });
</script>
