<template>
    <div
        class="flux-grid-column"
        :style="{
            gridColumn: `span ${span}`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue';
    import { useBreakpoints } from '@/composables';

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

<style lang="scss">
    .flux-grid-column {
        display: grid;
        grid-template-columns: 1fr;
    }
</style>
