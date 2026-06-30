<template>
    <tr
        :class="clsx($style.tableRow, isClickable && $style.isClickable, isSelected && $style.isSelected)"
        :tabindex="isClickable ? 0 : undefined"
        @click="onClick"
        @keydown="onKeydown">
        <slot/>
    </tr>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const INTERACTIVE_SELECTOR = 'a, button, input, label, select, textarea, [role="button"]';

    const emit = defineEmits<{
        rowClick: [MouseEvent];
    }>();

    defineProps<{
        readonly isClickable?: boolean;
        readonly isSelected?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    function onClick(event: MouseEvent): void {
        const target = event.target as HTMLElement | null;

        if (target?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        emit('rowClick', event);
    }

    function onKeydown(event: KeyboardEvent): void {
        if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) {
            return;
        }

        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
    }
</script>
