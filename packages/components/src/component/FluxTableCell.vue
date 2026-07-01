<template>
    <td
        ref="cell"
        :class="clsx(
            $style.tableCell,
            isHoverable && $style.isHoverable,
            isNumeric && $style.isNumeric,
            noWrap && $style.isNoWrap,
            pinnedSide === 'start' && $style.isPinnedStart,
            pinnedSide === 'end' && $style.isPinnedEnd
        )"
        :style="pinnedStyle"
        :colspan="colspan">
        <slot name="content">
            <div
                :class="$style.tableCellContent"
                :style="{
                    flexFlow: contentDirection,
                    gap: contentGap != null ? `${contentGap}px` : undefined,
                    alignItems: contentDirection === 'column' ? align : undefined,
                    justifyContent: contentDirection === 'column' ? undefined : align,
                    textAlign: align
                }">
                <slot/>
            </div>
        </slot>
    </td>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, useTemplateRef, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        contentDirection = 'row',
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

    defineSlots<{
        default(): VNode[];
        content(): VNode[];
    }>();

    const cell = useTemplateRef('cell');

    const {
        isHoverable,
        pinnedOffsets
    } = useTableInjection();

    const pinnedSide = computed<'start' | 'end' | null>(() => {
        if (pinned === true || pinned === 'start') {
            return 'start';
        }

        if (pinned === 'end') {
            return 'end';
        }

        return null;
    });

    const pinnedStyle = computed(() => {
        if (!pinnedSide.value) {
            return undefined;
        }

        const offset = pinnedOffsets.value.get(cell.value?.cellIndex ?? -1) ?? 0;

        return pinnedSide.value === 'start'
            ? {left: `${offset}px`}
            : {right: `${offset}px`};
    });
</script>
