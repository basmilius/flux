<template>
    <FluxDatePicker
        :class="$style.filterDatePicker"
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
    import { useFilterInjection } from '$flux/composable';
    import type { FluxIconName } from '$flux/types';
    import FluxDatePicker from './FluxDatePicker.vue';
    import $style from '$flux/css/component/Filter.module.scss';

    const {
        name,
        rangeMode = 'range'
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly label: string;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly name: string;
        readonly rangeMode?: 'range' | 'week' | 'month';
    }>();

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => {
        const value = unref(state)[name];

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

        setValue(name, date);
        back();
    }
</script>
