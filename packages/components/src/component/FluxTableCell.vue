<template>
    <td
        :class="clsx(
            $style.tableCell,
            isBordered && $style.isBordered,
            isHoverable && $style.isHoverable,
            isSeparated && $style.isSeparated,
            isStriped && $style.isStriped
        )"
        role="cell">
        <slot name="content">
            <div
                :class="$style.tableCellContent"
                :style="{
                    flexFlow: contentDirection,
                    gap: contentGap && `${contentGap}px`
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
    import { useTableInjection } from '$flux/composable';
    import $style from '$flux/css/component/Table.module.scss';

    const {
        contentDirection = 'row'
    } = defineProps<{
        readonly contentDirection?: 'column' | 'row';
        readonly contentGap?: number;
    }>();

    defineSlots<{
        default(): any;
        content(): any;
    }>();

    const {
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    } = useTableInjection();
</script>
