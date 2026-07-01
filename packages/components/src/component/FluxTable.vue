<template>
    <div
        ref="base"
        :class="[
            $style.table,
            isScrolledStart && $style.isScrolledStart,
            isScrollableEnd && $style.isScrollableEnd
        ]">
        <table
            :class="$style.tableBase"
            :aria-busy="isLoading || undefined">
            <slot name="colgroups"/>

            <thead
                v-if="slots.header"
                ref="head"
                :class="isSticky && $style.tableHeadSticky">
            <slot name="header"/>
            </thead>

            <tbody v-if="slots.default">
            <slot/>

            <FluxTableRow
                v-if="fillColumns"
                :class="$style.tableFill">
                <FluxTableCell
                    v-for="n of fillColumns"
                    :key="n"/>
            </FluxTableRow>
            </tbody>

            <tfoot
                v-if="slots.footer"
                ref="foot">
            <slot name="footer"/>
            </tfoot>

            <caption
                v-if="slots.caption"
                :style="{captionSide}">
                <slot name="caption"/>
            </caption>
        </table>

        <div
            v-if="isLoading"
            :class="$style.tableLoader"
            :style="loaderStyle">
            <FluxSpinner/>
        </div>

        <FluxPaneBody
            v-if="slots.pagination"
            :class="$style.tablePagination">
            <slot name="pagination"/>
        </FluxPaneBody>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, useScrollPosition } from '@flux-ui/internals';
    import { computed, provide, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { FluxTableInjectionKey } from '~flux/components/data';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTableCell from './FluxTableCell.vue';
    import FluxTableRow from './FluxTableRow.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        captionSide = 'bottom',
        isHoverable = false,
        isLoading = false,
        isSticky = false
    } = defineProps<{
        readonly captionSide?: 'top' | 'bottom';
        readonly fillColumns?: number;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSticky?: boolean;
    }>();

    const slots = defineSlots<{
        default?(): VNode;
        colgroups?(): VNode;
        caption?(): VNode;
        footer?(): VNode;
        header?(): VNode;
        pagination?(): VNode;
    }>();

    const base = useTemplateRef('base');
    const headRef = useTemplateRef('head');
    const footRef = useTemplateRef('foot');
    const {x, y} = useScrollPosition(base);

    const headHeight = ref(0);
    const footHeight = ref(0);
    const maxScrollLeft = ref(0);
    const pinnedOffsets = ref(new Map<number, number>());

    const isScrolledStart = computed(() => x.value > 0);
    const isScrollableEnd = computed(() => x.value < maxScrollLeft.value - 1);

    const loaderStyle = computed(() => ({
        transform: `translate(${x.value}px, ${y.value}px)`,
        top: `${headHeight.value}px`,
        bottom: `${footHeight.value}px`,
        borderTopLeftRadius: headHeight.value > 0 ? '0' : undefined,
        borderTopRightRadius: headHeight.value > 0 ? '0' : undefined,
        borderBottomLeftRadius: footHeight.value > 0 ? '0' : undefined,
        borderBottomRightRadius: footHeight.value > 0 ? '0' : undefined
    }));

    function measurePinned(): void {
        const baseEl = unref(base);
        const row = unref(headRef)?.querySelector('tr:has(> th)') ?? baseEl?.querySelector('tbody > tr');
        const offsets = new Map<number, number>();

        if (baseEl && row) {
            maxScrollLeft.value = baseEl.scrollWidth - baseEl.clientWidth;

            const cells = Array.from(row.children) as HTMLElement[];
            const widths = cells.map(cell => cell.offsetWidth);

            const lefts: number[] = [];
            let acc = 0;

            for (const width of widths) {
                lefts.push(acc);
                acc += width;
            }

            const totalWidth = acc;
            const rights = lefts.map((left, index) => totalWidth - left - widths[index]);

            const startIndices = cells.map((cell, index) => cell.classList.contains($style.isPinnedStart) ? index : -1).filter(index => index >= 0);
            const endIndices = cells.map((cell, index) => cell.classList.contains($style.isPinnedEnd) ? index : -1).filter(index => index >= 0);

            if (startIndices.length > 0) {
                const first = lefts[startIndices[0]];

                for (const index of startIndices) {
                    offsets.set(index, lefts[index] - first);
                }
            }

            if (endIndices.length > 0) {
                const last = rights[endIndices[endIndices.length - 1]];

                for (const index of endIndices) {
                    offsets.set(index, rights[index] - last);
                }
            }
        }

        pinnedOffsets.value = offsets;
    }

    const measure = animationFrameDebounce(() => {
        headHeight.value = unref(headRef)?.offsetHeight ?? 0;
        footHeight.value = unref(footRef)?.offsetHeight ?? 0;
        measurePinned();
    });

    watch([base, headRef, footRef], ([baseEl, head, foot], _, onCleanup) => {
        const observer = new ResizeObserver(measure);

        if (baseEl) {
            observer.observe(baseEl);
        }

        if (head) {
            observer.observe(head);
        }

        if (foot) {
            observer.observe(foot);
        }

        observer.observe(document.documentElement); // observe font-size changes.

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    provide(FluxTableInjectionKey, {
        isHoverable: toRef(() => isHoverable),
        pinnedOffsets
    });
</script>
