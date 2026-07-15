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
        role="cell"
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
        columns,
        pinnedEdges,
        pinnedOffsets
    } = useTableInjection();

    const isRaw = computed(() => 'content' in slots);

    // Spanning cells cover multiple columns, so their column's definition
    // (pinning, alignment, formatting) does not apply to them.
    const column = computed(() => colspan ? undefined : unref(columns)[getColumnIndex()]);

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

    const isPinnedEdge = computed(() => {
        if (!pinnedSide.value) {
            return false;
        }

        const columnIndex = getColumnIndex();

        return pinnedSide.value === 'start'
            ? columnIndex === pinnedEdges.value.start
            : columnIndex === pinnedEdges.value.end;
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
            const offset = pinnedOffsets.value.get(getColumnIndex()) ?? 0;

            if (pinnedSide.value === 'start') {
                style.left = `${offset}px`;
            } else {
                style.right = `${offset}px`;
            }
        }

        return style;
    });

    function getColumnIndex(): number {
        const element = cell.value;

        return element?.parentElement ? Array.prototype.indexOf.call(element.parentElement.children, element) : -1;
    }
</script>
