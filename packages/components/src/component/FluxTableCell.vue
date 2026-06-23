<template>
    <td
        :class="clsx(
            $style.tableCell,
            isHoverable && $style.isHoverable
        )"
        :colspan="colspan"
        role="cell">
        <slot name="content">
            <div
                :class="$style.tableCellContent"
                :style="{
                    flexFlow: contentDirection,
                    gap: contentGap != null ? `${contentGap}px` : undefined
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
        readonly colspan?: number;
        readonly contentDirection?: 'column' | 'row';
        readonly contentGap?: number;
    }>();

    defineSlots<{
        default(): VNode[];
        content(): VNode[];
    }>();

    const {
        isHoverable
    } = useTableInjection();
</script>
