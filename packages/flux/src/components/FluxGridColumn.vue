<template>
    <div
        :class="styles.gridColumn"
        :style="{
            '--span': `${span}`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue';
    import { useBreakpoints } from '@/composables';
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        readonly xs?: number;
        readonly sm?: number;
        readonly md?: number;
        readonly lg?: number;
        readonly xl?: number;
    }

    const props = defineProps<Props>();
    const {xs, sm, md, lg, xl} = toRefs(props);

    const {breakpoint} = useBreakpoints();

    const spans = computed(() => {
        const values = {
            xs: unref(xs),
            sm: unref(sm),
            md: unref(md),
            lg: unref(lg),
            xl: unref(xl)
        };

        values.xs ??= 12;
        values.sm ??= values.xs;
        values.md ??= values.sm;
        values.lg ??= values.md;
        values.xl ??= values.lg;

        return values;
    });

    const span = computed(() => unref(spans)[unref(breakpoint)]);
</script>
