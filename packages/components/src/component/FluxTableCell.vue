<template>
    <td
        :class="clsx(
            $style.tableCell,
            isHoverable && $style.isHoverable,
            noWrap && $style.isNoWrap,
            pinned && $style.isPinned
        )"
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
    import type { VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        contentDirection = 'row'
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly colspan?: number;
        readonly contentDirection?: 'column' | 'row';
        readonly contentGap?: number;
        readonly noWrap?: boolean;
        readonly pinned?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
        content(): VNode[];
    }>();

    const {
        isHoverable
    } = useTableInjection();
</script>
