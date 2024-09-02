<template>
    <FluxDatePicker
        :class="styles.filterDatePicker"
        :max="max"
        :min="min"
        :model-value="currentValue"
        :range-mode="rangeMode"
        @update:model-value="onDatePicked"/>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '@/composable';
    import type { IconNames } from '@/data';
    import FluxDatePicker from './FluxDatePicker.vue';
    import styles from '@/css/component/Filter.module.scss';

    export type Props = {
        readonly icon?: IconNames;
        readonly label: string;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly name: string;
        readonly rangeMode?: 'range' | 'week' | 'month';
    };

    const props = withDefaults(defineProps<Props>(), {
        rangeMode: 'range'
    });

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => {
        const value = unref(state)[props.name];

        if (!value || !Array.isArray(value)) {
            return null;
        }

        const [start, end] = value;

        if (!DateTime.isDateTime(start) || !DateTime.isDateTime(end)) {
            return null;
        }

        return [start, end];
    });

    function onDatePicked(date: DateTime | DateTime[] | null): void {
        if (date === null || !Array.isArray(date)) {
            return;
        }

        setValue(props.name, date);
        back();
    }
</script>
