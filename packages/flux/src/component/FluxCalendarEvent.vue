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

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly date: DateTime;
        readonly label: string;
    };

    const emit = defineEmits<Emits>();
    defineProps<Props>();

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
