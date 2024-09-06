<template>
    <FluxTooltip>
        <template #content>
            <slot name="tooltip">
                {{ label }}
            </slot>
        </template>

        <button
            :class="styles.calendarEvent"
            type="button"
            @click="onClick">
            <span>{{ label }}</span>
        </button>
    </FluxTooltip>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import FluxTooltip from './FluxTooltip.vue';
    import styles from '@/css/component/Calendar.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly date: DateTime;
        readonly label: string;
    }>();

    defineSlots<{
        tooltip(): any;
    }>();

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
