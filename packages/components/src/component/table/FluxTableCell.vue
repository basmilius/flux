<template>
    <div
        ref="cell"
        :class="clsx(
            $style.tableCell,
            isRaw && $style.isRaw,
            effectiveIsNumeric && $style.isNumeric,
            effectiveNoWrap && $style.isNoWrap,
            rowspan && $style.hasRowspan,
            pinnedSide === 'start' && $style.isPinnedStart,
            pinnedSide === 'end' && $style.isPinnedEnd,
            isPinnedEdge && $style.isPinnedEdge
        )"
        :role="cellRole"
        :aria-colspan="colspan"
        :aria-rowspan="rowspan"
        :data-flux-copy-value="copyValue"
        :style="cellStyle">
        <slot name="content">
            <slot/>
        </slot>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, unref, useTemplateRef, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import { useTableColumnIndex } from '~flux/components/composable/private';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        align,
        colspan,
        contentDirection = 'row',
        contentGap,
        isNumeric,
        noWrap,
        pinned,
        rowspan
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly colspan?: number;
        readonly contentDirection?: 'column' | 'row';
        readonly contentGap?: number;
        readonly copyValue?: string | number;
        readonly isNumeric?: boolean;
        readonly noWrap?: boolean;
        readonly pinned?: boolean | 'start' | 'end';
        readonly rowspan?: number;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        content(): VNode[];
    }>();

    const cell = useTemplateRef('cell');

    const {
        cellRole,
        columns,
        pinnedEdges,
        pinnedOffsets
    } = useTableInjection();

    const columnIndex = useTableColumnIndex(cell, columns);

    const isRaw = computed(() => 'content' in slots);
    const columnSpan = computed(() => Math.max(colspan ?? 1, 1));

    // Spanning cells cover multiple columns, so their column's definition
    // (pinning, alignment, formatting) does not apply to them.
    const column = computed(() => colspan ? undefined : unref(columns)[columnIndex.value]);

    const effectiveAlign = computed(() => align ?? column.value?.align);
    const effectiveIsNumeric = computed(() => isNumeric || (column.value?.isNumeric ?? false));
    const effectiveNoWrap = computed(() => noWrap || (column.value?.noWrap ?? false));

    const pinnedSide = computed<'start' | 'end' | null>(() => {
        if (pinned === true || pinned === 'start') {
            return 'start';
        }

        if (pinned === 'end') {
            return 'end';
        }

        return column.value?.pinned ?? null;
    });

    // A spanning cell is the edge as soon as it covers the edge column, not only
    // when it starts there.
    const isPinnedEdge = computed(() => {
        if (!pinnedSide.value) {
            return false;
        }

        const edge = pinnedSide.value === 'start' ? pinnedEdges.value.start : pinnedEdges.value.end;

        return edge >= columnIndex.value && edge < columnIndex.value + columnSpan.value;
    });

    const cellStyle = computed(() => {
        const style: Record<string, string> = {};

        if (!isRaw.value) {
            style.flexFlow = contentDirection;

            if (contentGap != null) {
                style.gap = `${contentGap}px`;
            }

            if (effectiveAlign.value) {
                if (contentDirection === 'column') {
                    style.alignItems = effectiveAlign.value;
                } else {
                    style.justifyContent = effectiveAlign.value;
                }

                style.textAlign = effectiveAlign.value;
            }
        }

        if (colspan) {
            style.gridColumn = `span ${colspan}`;
        }

        if (rowspan) {
            style.gridRow = `span ${rowspan}`;
        }

        if (pinnedSide.value) {
            // The offsets are measured per column, from the edge the column is
            // pinned to; a spanning cell sits at the offset of the column it ends on.
            const offsetIndex = pinnedSide.value === 'start' ? columnIndex.value : columnIndex.value + columnSpan.value - 1;
            const offset = pinnedOffsets.value.get(offsetIndex) ?? 0;

            if (pinnedSide.value === 'start') {
                style.left = `${offset}px`;
            } else {
                style.right = `${offset}px`;
            }
        }

        return style;
    });
</script>
