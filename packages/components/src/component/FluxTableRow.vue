<template>
    <div
        ref="row"
        v-show="!isHidden"
        :class="clsx(
            $style.tableRow,
            isClickable && $style.isClickable,
            isSelected && $style.isSelected,
            color && $style.isColored,
            color === 'gray' && $style.tableRowGray,
            color === 'primary' && $style.tableRowPrimary,
            color === 'danger' && $style.tableRowDanger,
            color === 'info' && $style.tableRowInfo,
            color === 'success' && $style.tableRowSuccess,
            color === 'warning' && $style.tableRowWarning
        )"
        role="row"
        :tabindex="tabindex"
        @click="onClick"
        @focusin="onFocusin"
        @keydown="onKeydown">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, onUnmounted, useTemplateRef, type VNode, watch } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import $style from '~flux/components/css/component/Table.module.scss';

    const emit = defineEmits<{
        rowClick: [columnIndex: number, event: MouseEvent];
    }>();

    const {
        isClickable,
        isHidden
    } = defineProps<{
        readonly color?: FluxColor;
        readonly isClickable?: boolean;
        readonly isHidden?: boolean;
        readonly isSelected?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const INTERACTIVE_SELECTOR = 'a, button, input, label, select, textarea, [role="button"]';

    const row = useTemplateRef('row');

    const {activeRow} = useTableInjection();

    // Roving tabindex: before any row is focused, every clickable row is a
    // tab stop; afterwards only the last-focused row is, so Tab leaves the
    // table instead of walking every row. A hidden row (collapsed group kept
    // mounted) drops its tabindex so the roving query and Tab both skip it.
    const tabindex = computed(() => {
        if (!isClickable || isHidden) {
            return undefined;
        }

        return activeRow.value === null || activeRow.value === row.value ? 0 : -1;
    });

    // Hiding the active row would leave every remaining row at tabindex -1,
    // making the table unreachable by Tab; release the roving anchor so the
    // visible rows become tab stops again (mirrors onUnmounted).
    watch(() => isHidden, hidden => {
        if (hidden && activeRow.value === row.value) {
            activeRow.value = null;
        }
    });

    onUnmounted(() => {
        if (activeRow.value === row.value) {
            activeRow.value = null;
        }
    });

    function onFocusin(event: FocusEvent): void {
        if (event.target !== event.currentTarget) {
            return;
        }

        activeRow.value = event.currentTarget as HTMLElement;
    }

    function onClick(event: MouseEvent): void {
        const target = event.target as HTMLElement | null;

        if (target?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        const cell = target?.closest('[role="cell"], [role="columnheader"]');
        const columnIndex = cell?.parentElement ? Array.prototype.indexOf.call(cell.parentElement.children, cell) : -1;

        emit('rowClick', columnIndex, event);
    }

    function onKeydown(event: KeyboardEvent): void {
        if (event.target !== event.currentTarget) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            (event.currentTarget as HTMLElement).click();
            return;
        }

        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'Home' && event.key !== 'End') {
            return;
        }

        event.preventDefault();

        const current = event.currentTarget as HTMLElement;
        const rows = Array.from(current.closest('[role="table"]')?.querySelectorAll<HTMLElement>('[role="row"][tabindex]') ?? []);
        const index = rows.indexOf(current);

        if (index === -1) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp':
                rows[index - 1]?.focus();
                break;

            case 'ArrowDown':
                rows[index + 1]?.focus();
                break;

            case 'Home':
                rows[0]?.focus();
                break;

            case 'End':
                rows[rows.length - 1]?.focus();
                break;
        }
    }
</script>
