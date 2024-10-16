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
                    flexFlow: contentDirection
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
    import { useTableInjection } from '@/composable';
    import $style from '@/css/component/Table.module.scss';

    const {
        contentDirection = 'row'
    } = defineProps<{
        readonly contentDirection?: 'column' | 'row';
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
