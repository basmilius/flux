<template>
    <Component
        :is="tag ?? 'div'"
        ref="masonry"
        :class="clsx($style.masonry, isPacked && $style.isPacked)"
        :style="{
            '--columns': columnCount,
            '--gap': `${gap}px`
        }">
        <FluxDynamicView
            v-for="(item, index) of items"
            :key="index"
            :vnode="item"/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, flattenVNodeTree, unrefTemplateElement } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { cloneVNode, computed, ref, unref, useTemplateRef, type VNode, watch } from 'vue';
    import FluxDynamicView from './FluxDynamicView.vue';
    import $style from '~flux/components/css/component/Masonry.module.scss';

    // Mirrors the breakpoints in css/mixin/breakpoints.scss, but measured against the
    // masonry itself instead of the viewport. A container cannot query its own width,
    // so the column count comes from the same observer that measures the items.
    const BREAKPOINTS = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
    } as const;

    type Breakpoint = keyof typeof BREAKPOINTS;

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

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    const masonryRef = useTemplateRef('masonry');

    const isPacked = ref(false);
    const spans = ref<number[]>([]);
    const width = ref(0);

    const columnsPerBreakpoint = computed(() => {
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

    const columnCount = computed(() => {
        const perBreakpoint = unref(columnsPerBreakpoint);
        let count = perBreakpoint.xs;

        for (const [breakpoint, minWidth] of Object.entries(BREAKPOINTS) as [Breakpoint, number][]) {
            if (unref(width) >= minWidth) {
                count = perBreakpoint[breakpoint];
            }
        }

        return count;
    });

    const slotItems = computed(() => flattenVNodeTree(slots.default?.()));

    const items = computed(() => unref(slotItems).map((vnode, index) => {
        const span = unref(spans)[index];

        return span ? cloneVNode(vnode, {style: {gridRowEnd: `span ${span}`}}) : vnode;
    }));

    const reflow = animationFrameDebounce(() => {
        const masonry = unrefTemplateElement(masonryRef);

        if (!masonry) {
            return;
        }

        width.value = masonry.clientWidth;

        // The rows are 1px each and the row gap is zero, so an item claims its own height
        // plus the gap that has to sit below it.
        const measured = Array.from(masonry.children)
            .filter(item => item instanceof HTMLElement)
            .map(item => Math.ceil(item.getBoundingClientRect().height) + gap);

        if (measured.length !== unref(spans).length || measured.some((span, index) => span !== unref(spans)[index])) {
            spans.value = measured;
        }

        isPacked.value = true;
    });

    watch([masonryRef, () => unref(slotItems).length], (_, __, onCleanup) => {
        const masonry = unrefTemplateElement(masonryRef);

        if (!masonry) {
            return;
        }

        const observer = new ResizeObserver(reflow);
        observer.observe(masonry);

        for (const item of masonry.children) {
            if (item instanceof HTMLElement) {
                observer.observe(item);
            }
        }

        onCleanup(() => {
            observer.disconnect();
        });
    }, {flush: 'post', immediate: true});

    watch(() => gap, reflow);
</script>
