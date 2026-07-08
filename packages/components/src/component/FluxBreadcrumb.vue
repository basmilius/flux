<template>
    <nav
        :class="$style.breadcrumb"
        :aria-label="ariaLabel">
        <ol
            ref="list"
            :class="clsx(
                $style.breadcrumbList,
                collapse !== 'none' && $style.isCollapsible
            )">
            <template v-if="collapse === 'none'">
                <slot/>
            </template>

            <template v-else>
                <FluxDynamicView
                    v-for="(vnode, index) in visibleStartItems()"
                    :key="index"
                    :vnode="vnode"/>

                <FluxBreadcrumbCollapsed
                    v-if="hasCollapse"
                    :items="collapsedItems()"
                    :label="collapseLabel"/>

                <FluxDynamicView
                    v-for="(vnode, index) in visibleEndItems()"
                    :key="tailStart + index"
                    :vnode="vnode"/>
            </template>
        </ol>

        <ol
            v-if="collapse !== 'none'"
            ref="measurer"
            :class="$style.breadcrumbMeasurer"
            aria-hidden="true">
            <slot/>
        </ol>

        <ol
            v-if="collapse !== 'none'"
            ref="ellipsisMeasurer"
            :class="$style.breadcrumbMeasurer"
            aria-hidden="true">
            <FluxBreadcrumbCollapsed
                :items="[]"
                :label="collapseLabel"/>

            <li :class="$style.breadcrumbItem"/>
        </ol>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, flattenVNodeTree, unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { onUpdated, provide, ref, toRef, useTemplateRef, type VNode, watch } from 'vue';
    import { FluxBreadcrumbSeparatorInjectionKey } from '~flux/components/data';
    import FluxBreadcrumbCollapsed from './FluxBreadcrumbCollapsed.vue';
    import FluxDynamicView from './FluxDynamicView.vue';
    import $style from '~flux/components/css/component/Breadcrumb.module.scss';

    // Gap between list items, mirrors `.breadcrumbList { gap }` in the stylesheet.
    const GAP = 3;

    const {
        ariaLabel = 'Breadcrumb',
        collapse = 'none',
        collapseLabel = 'Show more',
        separator = 'angle-right'
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly collapse?: 'none' | 'start' | 'middle';
        readonly collapseLabel?: string;
        readonly separator?: FluxIconName;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    provide(FluxBreadcrumbSeparatorInjectionKey, toRef(() => separator));

    const listRef = useTemplateRef('list');
    const measurerRef = useTemplateRef('measurer');
    const ellipsisMeasurerRef = useTemplateRef('ellipsisMeasurer');

    const hasCollapse = ref(false);
    const tailStart = ref(0);

    // Re-read the slot on every access rather than memoising: a route-driven trail
    // swaps its items reactively and a cached VNode list would go stale.
    const collectItems = (): VNode[] => flattenVNodeTree(slots.default?.() ?? []);
    const startCount = (): number => collapse === 'middle' ? 1 : 0;

    const visibleStartItems = (): VNode[] => hasCollapse.value ? collectItems().slice(0, startCount()) : collectItems();
    const collapsedItems = (): VNode[] => hasCollapse.value ? collectItems().slice(startCount(), tailStart.value) : [];
    const visibleEndItems = (): VNode[] => hasCollapse.value ? collectItems().slice(tailStart.value) : [];

    const reflow = animationFrameDebounce(() => {
        if (collapse === 'none') {
            return;
        }

        const list = unrefTemplateElement(listRef);
        const measurer = unrefTemplateElement(measurerRef);
        const ellipsisMeasurer = unrefTemplateElement(ellipsisMeasurerRef);

        if (!list || !measurer || !ellipsisMeasurer) {
            return;
        }

        const widths = Array.from(measurer.children)
            .filter((child): child is HTMLElement => child instanceof HTMLElement)
            .map(child => child.offsetWidth);

        const count = widths.length;
        const start = startCount();

        // Nothing to collapse: too few items to hide anything between the pinned
        // start and the always-visible last item.
        if (count <= start + 1) {
            hasCollapse.value = false;
            return;
        }

        const available = list.clientWidth;
        const totalAll = widths.reduce((total, width) => total + width, 0) + (count - 1) * GAP;

        if (totalAll <= available) {
            hasCollapse.value = false;
            return;
        }

        const ellipsisWidth = (ellipsisMeasurer.children[0] as HTMLElement | undefined)?.offsetWidth ?? 0;

        const selectionWidth = (from: number): number => {
            let width = ellipsisWidth;
            let units = 1;

            for (let index = 0; index < start; index++) {
                width += widths[index];
                units++;
            }

            for (let index = from; index < count; index++) {
                width += widths[index];
                units++;
            }

            return width + (units - 1) * GAP;
        };

        // Grow the visible tail backwards from the last item while it keeps fitting.
        let from = count - 1;

        while (from - 1 >= start && selectionWidth(from - 1) <= available) {
            from--;
        }

        hasCollapse.value = true;
        tailStart.value = from;
    });

    watch([listRef, measurerRef, ellipsisMeasurerRef], ([list, measurer], _, onCleanup) => {
        if (!list || !measurer) {
            return;
        }

        const observer = new ResizeObserver(reflow);
        observer.observe(list);
        observer.observe(measurer);
        observer.observe(document.documentElement);

        onCleanup(() => {
            observer.disconnect();
        });
    }, {immediate: true});

    // A changed trail (added/removed/reordered items) re-renders the hidden measurer
    // without necessarily resizing it, so re-run the fit after every update too.
    onUpdated(reflow);

    watch(() => collapse, reflow);
</script>
