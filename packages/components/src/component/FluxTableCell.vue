<template>
    <div
        ref="cell"
        :class="clsx(
            $style.tableCell,
            isRaw && $style.isRaw,
            isHoverable && $style.isHoverable,
            isNumeric && $style.isNumeric,
            noWrap && $style.isNoWrap,
            pinnedSide === 'start' && $style.isPinnedStart,
            pinnedSide === 'end' && $style.isPinnedEnd
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
    import { computed, useTemplateRef, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        align,
        colspan,
        contentDirection = 'row',
        contentGap,
        pinned
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly colspan?: number;
        readonly contentDirection?: 'column' | 'row';
        readonly contentGap?: number;
        readonly isNumeric?: boolean;
        readonly noWrap?: boolean;
        readonly pinned?: boolean | 'start' | 'end';
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        content(): VNode[];
    }>();

    const cell = useTemplateRef('cell');

    const {
        isHoverable,
        pinnedOffsets
    } = useTableInjection();

    const isRaw = computed(() => 'content' in slots);

    const pinnedSide = computed<'start' | 'end' | null>(() => {
        if (pinned === true || pinned === 'start') {
            return 'start';
        }

        if (pinned === 'end') {
            return 'end';
        }

        return null;
    });

    const cellStyle = computed(() => {
        const style: Record<string, string> = {};

        if (!isRaw.value) {
            style.flexFlow = contentDirection;

            if (contentGap != null) {
                style.gap = `${contentGap}px`;
            }

            if (align) {
                if (contentDirection === 'column') {
                    style.alignItems = align;
                } else {
                    style.justifyContent = align;
                }

                style.textAlign = align;
            }
        }

        if (colspan) {
            style.gridColumn = `span ${colspan}`;
        }

        if (pinnedSide.value) {
            const element = cell.value;
            const columnIndex = element?.parentElement ? Array.prototype.indexOf.call(element.parentElement.children, element) : -1;
            const offset = pinnedOffsets.value.get(columnIndex) ?? 0;

            if (pinnedSide.value === 'start') {
                style.left = `${offset}px`;
            } else {
                style.right = `${offset}px`;
            }
        }

        return style;
    });
</script>
