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

    export type Props = {
        readonly contentDirection?: 'column' | 'row';
    };

    withDefaults(defineProps<Props>(), {
        contentDirection: 'row'
    });

    const {
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    } = useTableInjection();
</script>
