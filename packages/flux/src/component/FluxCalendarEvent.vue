<template>
    <FluxTooltip>
        <template #content>
            <slot name="tooltip">
                {{ label }}
            </slot>
        </template>

        <button
            :class="$style.calendarEvent"
            type="button"
            @click="onClick">
            <span>{{ label }}</span>
        </button>
    </FluxTooltip>
</template>

<script
    lang="ts"
    setup>
    import type { DateTime } from 'luxon';
    import FluxTooltip from './FluxTooltip.vue';
    import $style from '@/css/component/Calendar.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly date: DateTime | [DateTime, DateTime];
        readonly label: string;
    }>();

    defineSlots<{
        tooltip(): any;
    }>();

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
