<template>
    <div
        ref="base"
        :class="[
            $style.table,
            isScrolledStart && $style.isScrolledStart,
            isScrollableEnd && $style.isScrollableEnd
        ]"
        :style="{
            '--flux-table-columns': gridTemplateColumns,
            '--flux-table-fill-height': `${fillHeight}px`
        }">
        <div
            ref="grid"
            :class="$style.tableBase"
            role="table"
            :aria-busy="isLoading || undefined"
            :aria-describedby="slots.caption ? captionId : undefined">
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
                    v-if="fillColumns"
                    :class="$style.tableFill">
                    <FluxTableCell
                        v-for="n of fillColumns"
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
    import { computed, provide, type Ref, ref, shallowReactive, toRef, unref, useId, useTemplateRef, type VNode, watch } from 'vue';
    import { type FluxTableColumnDef, FluxTableInjectionKey } from '~flux/components/data';
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
    const gridRef = useTemplateRef('grid');
    const headRef = useTemplateRef('head');
    const bodyRef = useTemplateRef('body');
    const footRef = useTemplateRef('foot');
    const {x, y} = useScrollPosition(base);

    const captionId = useId();

    const headHeight = ref(0);
    const footHeight = ref(0);
    const fillHeight = ref(0);
    const maxScrollLeft = ref(0);
    const fallbackColumnCount = ref(0);
    const pinnedOffsets = ref(new Map<number, number>());
    const columnRegistrations = shallowReactive(new Set<ColumnRegistration>());

    const isScrolledStart = computed(() => x.value > 0);
    const isScrollableEnd = computed(() => x.value < maxScrollLeft.value - 1);

    const sortedColumns = computed(() => Array.from(columnRegistrations)
        .filter(registration => registration.element.value !== null)
        .sort((a, b) => a.element.value!.compareDocumentPosition(b.element.value!) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
        .map(registration => registration.column.value));

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

    const loaderStyle = computed(() => ({
        transform: `translate(${x.value}px, ${y.value}px)`,
        top: `${headHeight.value}px`,
        bottom: `${footHeight.value}px`,
        borderTopLeftRadius: headHeight.value > 0 ? '0' : undefined,
        borderTopRightRadius: headHeight.value > 0 ? '0' : undefined,
        borderBottomLeftRadius: footHeight.value > 0 ? '0' : undefined,
        borderBottomRightRadius: footHeight.value > 0 ? '0' : undefined
    }));

    function registerColumn(element: Readonly<Ref<HTMLElement | null>>, column: Readonly<Ref<FluxTableColumnDef>>): () => void {
        const registration: ColumnRegistration = {column, element};

        columnRegistrations.add(registration);
        measure();

        return () => {
            columnRegistrations.delete(registration);
            measure();
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

    function measurePinned(): void {
        const baseEl = unref(base);
        const gridEl = unref(gridRef);
        const offsets = new Map<number, number>();

        if (baseEl && gridEl) {
            maxScrollLeft.value = baseEl.scrollWidth - baseEl.clientWidth;

            const widths = getComputedStyle(gridEl).gridTemplateColumns
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

            const columns = unref(sortedColumns);
            let startIndices = columns.map((column, index) => column.pinned === 'start' ? index : -1).filter(index => index >= 0);
            let endIndices = columns.map((column, index) => column.pinned === 'end' ? index : -1).filter(index => index >= 0);

            if (columns.length === 0) {
                const cells = Array.from(unref(bodyRef)?.querySelector(`:scope > .${$style.tableRow}`)?.children ?? []);

                startIndices = cells.map((cell, index) => cell.classList.contains($style.isPinnedStart) ? index : -1).filter(index => index >= 0);
                endIndices = cells.map((cell, index) => cell.classList.contains($style.isPinnedEnd) ? index : -1).filter(index => index >= 0);
            }

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

    function measureFill(): void {
        const baseEl = unref(base);
        const gridEl = unref(gridRef);
        const bodyEl = unref(bodyRef);
        const fillEl = bodyEl?.querySelector<HTMLElement>(`:scope > .${$style.tableFill}, :scope > .${$style.tableEmptyFill}`);

        if (!baseEl || !gridEl || !bodyEl || !fillEl) {
            fillHeight.value = 0;
            return;
        }

        let siblingsHeight = 0;

        for (const child of baseEl.children) {
            if (child !== gridEl && child instanceof HTMLElement && !child.classList.contains($style.tableLoader)) {
                siblingsHeight += child.offsetHeight;
            }
        }

        const contentHeight = headHeight.value + bodyEl.offsetHeight - fillEl.offsetHeight + footHeight.value;

        fillHeight.value = Math.max(0, baseEl.clientHeight - siblingsHeight - contentHeight);
    }

    let measuredTemplate: string | null = null;

    // WebKit does not recompute subgrid row heights after the resolved column
    // template changes; touching the rowgroup style after layout forces that
    // recomputation.
    function nudgeSubgridRows(): void {
        const gridEl = unref(gridRef);

        if (!gridEl) {
            return;
        }

        const template = getComputedStyle(gridEl).gridTemplateColumns;

        if (template === measuredTemplate) {
            return;
        }

        measuredTemplate = template;

        for (const rowGroup of [unref(headRef), unref(bodyRef), unref(footRef)]) {
            if (rowGroup) {
                rowGroup.style.gridAutoRows = rowGroup.style.gridAutoRows === 'max-content' ? '' : 'max-content';
            }
        }
    }

    const measure = animationFrameDebounce(() => {
        headHeight.value = unref(headRef)?.offsetHeight ?? 0;
        footHeight.value = unref(footRef)?.offsetHeight ?? 0;
        measureFallbackColumns();
        measurePinned();
        measureFill();
        nudgeSubgridRows();
    });

    watch(gridTemplateColumns, () => measure(), {flush: 'post'});

    watch([base, headRef, bodyRef, footRef], ([baseEl, head, bodyEl, foot], _, onCleanup) => {
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
        isHoverable: toRef(() => isHoverable),
        pinnedOffsets,
        registerColumn
    });
</script>
