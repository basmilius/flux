<template>
    <div
        ref="base"
        :class="[
            $style.table,
            isHoverable && $style.isHoverable,
            isSticky && $style.isSticky
        ]"
        :style="{'--flux-table-columns': gridTemplateColumns}">
        <div
            ref="grid"
            :class="$style.tableBase"
            role="table"
            :aria-busy="isLoading || undefined"
            :aria-describedby="slots.caption ? captionId : undefined"
            :aria-rowcount="ariaRowcount">
            <div
                v-if="slots.header"
                ref="head"
                :class="[$style.tableHead, isSticky && $style.tableHeadSticky]"
                role="rowgroup">
                <slot name="header"/>
            </div>

            <div
                v-if="slots.default"
                ref="body"
                :class="$style.tableBody"
                role="rowgroup">
                <slot/>

                <FluxTableRow
                    v-if="isFilled"
                    :class="$style.tableFill">
                    <FluxTableCell
                        v-for="n of fillCellCount"
                        :key="n"/>
                </FluxTableRow>
            </div>

            <div
                v-if="slots.footer"
                ref="foot"
                :class="$style.tableFoot"
                role="rowgroup">
                <slot name="footer"/>
            </div>
        </div>

        <div
            v-if="slots.caption"
            :id="captionId"
            :class="[$style.tableCaption, captionSide === 'top' && $style.isTop]">
            <slot name="caption"/>
        </div>

        <div
            v-if="isLoading"
            ref="loader"
            :class="$style.tableLoader">
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
    import { computed, onMounted, provide, type Ref, ref, shallowReactive, unref, useId, useTemplateRef, type VNode, watch, watchEffect } from 'vue';
    import { type FluxTableColumnDef, FluxTableInjectionKey, type FluxTablePinnedEdges } from '~flux/components/data';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTableCell from './FluxTableCell.vue';
    import FluxTableRow from './FluxTableRow.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    type ColumnRegistration = {
        readonly column: Readonly<Ref<FluxTableColumnDef>>;
        readonly element: Readonly<Ref<HTMLElement | null>>;
    };

    const {
        captionSide = 'bottom',
        isFilled = false,
        isHoverable = false,
        isLoading = false,
        isSticky = false
    } = defineProps<{
        readonly ariaRowcount?: number;
        readonly captionSide?: 'top' | 'bottom';
        readonly isFilled?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSticky?: boolean;
    }>();

    const slots = defineSlots<{
        default?(): VNode;
        caption?(): VNode;
        footer?(): VNode;
        header?(): VNode;
        pagination?(): VNode;
    }>();

    const base = useTemplateRef('base');
    const gridRef = useTemplateRef('grid');
    const headRef = useTemplateRef('head');
    const bodyRef = useTemplateRef('body');
    const footRef = useTemplateRef('foot');
    const loaderRef = useTemplateRef('loader');
    const {x, y} = useScrollPosition(base);

    const captionId = useId();

    const headHeight = ref(0);
    const footHeight = ref(0);
    const maxScrollLeft = ref(0);
    const fallbackColumnCount = ref(0);
    const pinnedEdges = ref<FluxTablePinnedEdges>({end: -1, start: -1});
    const pinnedOffsets = ref(new Map<number, number>());
    const columnRegistrations = shallowReactive(new Set<ColumnRegistration>());

    const isScrolledStart = computed(() => x.value > 0);
    const isScrollableEnd = computed(() => x.value < maxScrollLeft.value - 1);

    const sortedColumns = computed(() => {
        const registrations = Array.from(columnRegistrations);

        // Headers register during setup, before their element mounts. At that
        // point registration order matches render order, which keeps the
        // column template correct from the very first frame.
        if (registrations.some(registration => registration.element.value === null)) {
            return registrations.map(registration => registration.column.value);
        }

        return registrations
            .sort((a, b) => a.element.value!.compareDocumentPosition(b.element.value!) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
            .map(registration => registration.column.value);
    });

    const fillCellCount = computed(() => unref(sortedColumns).length || fallbackColumnCount.value);

    const gridTemplateColumns = computed(() => {
        const columns = unref(sortedColumns);

        if (columns.length === 0) {
            return fallbackColumnCount.value > 0 ? `repeat(${fallbackColumnCount.value}, auto)` : 'none';
        }

        return columns
            .map(column => {
                if (column.width !== undefined) {
                    return `${column.width}px`;
                }

                if (column.isShrinking) {
                    return 'auto';
                }

                if (column.minWidth === undefined && column.maxWidth === undefined) {
                    return '1fr';
                }

                const min = column.minWidth !== undefined ? `${column.minWidth}px` : 'auto';
                const max = column.maxWidth !== undefined ? `${column.maxWidth}px` : '1fr';

                return `minmax(${min}, ${max})`;
            })
            .join(' ');
    });

    function registerColumn(element: Readonly<Ref<HTMLElement | null>>, column: Readonly<Ref<FluxTableColumnDef>>): () => void {
        const registration: ColumnRegistration = {column, element};

        columnRegistrations.add(registration);

        return () => {
            columnRegistrations.delete(registration);
        };
    }

    function measureFallbackColumns(): void {
        if (columnRegistrations.size > 0) {
            fallbackColumnCount.value = 0;
            return;
        }

        const firstRow = unref(bodyRef)?.querySelector(`:scope > .${$style.tableRow}`);
        fallbackColumnCount.value = firstRow?.children.length ?? 0;
    }

    function areOffsetsEqual(a: Map<number, number>, b: Map<number, number>): boolean {
        if (a.size !== b.size) {
            return false;
        }

        for (const [index, offset] of a) {
            if (b.get(index) !== offset) {
                return false;
            }
        }

        return true;
    }

    function measurePinned(resolvedTemplate: string): void {
        const baseEl = unref(base);

        if (!baseEl) {
            return;
        }

        maxScrollLeft.value = baseEl.scrollWidth - baseEl.clientWidth;

        const columns = unref(sortedColumns);
        let startIndices = columns.map((column, index) => column.pinned === 'start' ? index : -1).filter(index => index >= 0);
        let endIndices = columns.map((column, index) => column.pinned === 'end' ? index : -1).filter(index => index >= 0);

        if (columns.length === 0) {
            const cells = Array.from(unref(bodyRef)?.querySelector(`:scope > .${$style.tableRow}`)?.children ?? []);

            startIndices = cells.map((cell, index) => cell.classList.contains($style.isPinnedStart) ? index : -1).filter(index => index >= 0);
            endIndices = cells.map((cell, index) => cell.classList.contains($style.isPinnedEnd) ? index : -1).filter(index => index >= 0);
        }

        const edges: FluxTablePinnedEdges = {
            end: endIndices[0] ?? -1,
            start: startIndices[startIndices.length - 1] ?? -1
        };

        if (edges.end !== pinnedEdges.value.end || edges.start !== pinnedEdges.value.start) {
            pinnedEdges.value = edges;
        }

        if (startIndices.length === 0 && endIndices.length === 0) {
            if (pinnedOffsets.value.size > 0) {
                pinnedOffsets.value = new Map();
            }

            return;
        }

        const widths = resolvedTemplate
            .split(' ')
            .map(track => Number.parseFloat(track))
            .filter(width => !Number.isNaN(width));

        const lefts: number[] = [];
        let acc = 0;

        for (const width of widths) {
            lefts.push(acc);
            acc += width;
        }

        const totalWidth = acc;
        const rights = lefts.map((left, index) => totalWidth - left - widths[index]);
        const offsets = new Map<number, number>();

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

        if (!areOffsetsEqual(offsets, pinnedOffsets.value)) {
            pinnedOffsets.value = offsets;
        }
    }

    let appliedFillHeight: number | null = null;

    function measureFill(): void {
        const baseEl = unref(base);
        const gridEl = unref(gridRef);
        const bodyEl = unref(bodyRef);
        const fillEl = bodyEl?.querySelector<HTMLElement>(`:scope > .${$style.tableFill}, :scope > .${$style.tableEmptyFill}`);

        if (!baseEl || !gridEl || !bodyEl) {
            return;
        }

        let fillHeight = 0;

        if (fillEl) {
            let siblingsHeight = 0;

            for (const child of baseEl.children) {
                if (child !== gridEl && child instanceof HTMLElement && !child.classList.contains($style.tableLoader)) {
                    siblingsHeight += child.offsetHeight;
                }
            }

            const contentHeight = headHeight.value + bodyEl.offsetHeight - fillEl.offsetHeight + footHeight.value;

            fillHeight = Math.max(0, baseEl.clientHeight - siblingsHeight - contentHeight);
        }

        if (fillHeight !== appliedFillHeight) {
            appliedFillHeight = fillHeight;
            baseEl.style.setProperty('--flux-table-fill-height', `${fillHeight}px`);
        }
    }

    let measuredTemplate: string | null = null;

    // WebKit does not recompute subgrid row heights after the resolved column
    // template changes; touching the rowgroup style after layout forces that
    // recomputation.
    function nudgeSubgridRows(resolvedTemplate: string): void {
        if (resolvedTemplate === measuredTemplate) {
            return;
        }

        measuredTemplate = resolvedTemplate;

        for (const rowGroup of [unref(headRef), unref(bodyRef), unref(footRef)]) {
            if (rowGroup) {
                rowGroup.style.gridAutoRows = rowGroup.style.gridAutoRows === 'max-content' ? '' : 'max-content';
            }
        }
    }

    let appliedHeadHeight: number | null = null;

    const measure = animationFrameDebounce(() => {
        const gridEl = unref(gridRef);

        headHeight.value = unref(headRef)?.offsetHeight ?? 0;
        footHeight.value = unref(footRef)?.offsetHeight ?? 0;
        measureFallbackColumns();

        if (headHeight.value !== appliedHeadHeight) {
            appliedHeadHeight = headHeight.value;
            unref(base)?.style.setProperty('--flux-table-head-height', `${headHeight.value}px`);
        }

        const resolvedTemplate = gridEl ? getComputedStyle(gridEl).gridTemplateColumns : '';

        measurePinned(resolvedTemplate);
        measureFill();
        nudgeSubgridRows(resolvedTemplate);
    });

    watchEffect(() => {
        const baseEl = unref(base);

        if (!baseEl) {
            return;
        }

        if (isScrolledStart.value) {
            baseEl.setAttribute('data-scrolled-start', '');
        } else {
            baseEl.removeAttribute('data-scrolled-start');
        }

        if (isScrollableEnd.value) {
            baseEl.setAttribute('data-scrollable-end', '');
        } else {
            baseEl.removeAttribute('data-scrollable-end');
        }
    });

    watchEffect(() => {
        const loaderEl = unref(loaderRef);

        if (!loaderEl) {
            return;
        }

        const {style} = loaderEl;

        style.transform = `translate(${x.value}px, ${y.value}px)`;
        style.top = `${headHeight.value}px`;
        style.bottom = `${footHeight.value}px`;
        style.borderTopLeftRadius = headHeight.value > 0 ? '0' : '';
        style.borderTopRightRadius = headHeight.value > 0 ? '0' : '';
        style.borderBottomLeftRadius = footHeight.value > 0 ? '0' : '';
        style.borderBottomRightRadius = footHeight.value > 0 ? '0' : '';
    });

    // The columns registered during setup only reach the DOM with the next
    // template patch, which lands after ancestors' mounted hooks. Write the
    // template immediately so mounted-time measurements see the real layout.
    onMounted(() => {
        unref(base)?.style.setProperty('--flux-table-columns', gridTemplateColumns.value);
    });

    watch(sortedColumns, () => measure());

    watch([base, headRef, bodyRef, footRef], ([baseEl, head, bodyEl, foot], _, onCleanup) => {
        if (typeof ResizeObserver === 'undefined') {
            return;
        }

        const observer = new ResizeObserver(measure);

        if (baseEl) {
            observer.observe(baseEl);
        }

        if (head) {
            observer.observe(head);
        }

        if (bodyEl) {
            observer.observe(bodyEl);
        }

        if (foot) {
            observer.observe(foot);
        }

        observer.observe(document.documentElement); // observe font-size changes.

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    provide(FluxTableInjectionKey, {
        columns: sortedColumns,
        pinnedEdges,
        pinnedOffsets,
        registerColumn
    });

    defineExpose({
        columns: sortedColumns
    });
</script>
