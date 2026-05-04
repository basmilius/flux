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
    import type { FluxFilterDateRangeSpec } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '~flux/components/composable';
    import { createLabelForDateRange, defineFilter, pickFilterCommon } from '~flux/components/util';
    import FluxDatePicker from './FluxDatePicker.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

    type Props = FluxFilterDateRangeSpec & {
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly rangeMode?: 'range' | 'week' | 'month';
    };

    defineFilter<Props>(p => ({
        ...pickFilterCommon(p),
        type: 'dateRange',
        async getValueLabel(value) {
            if (!Array.isArray(value) || value.length !== 2) {
                return null;
            }

            const [start, end] = value;

            if (!DateTime.isDateTime(start) || !DateTime.isDateTime(end)) {
                return null;
            }

            return createLabelForDateRange(start, end);
        }
    }));

    const {
        name,
        rangeMode = 'range'
    } = defineProps<Props>();

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
