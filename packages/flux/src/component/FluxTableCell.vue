<template>
    <td
        :class="clsx(
            styles.tableCell,
            isBordered && styles.isBordered,
            isHoverable && styles.isHoverable,
            isSeparated && styles.isSeparated,
            isStriped && styles.isStriped
        )"
        role="cell">
        <slot name="content">
            <div
                :class="styles.tableCellContent"
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
    import styles from '@/css/component/Table.module.scss';

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
