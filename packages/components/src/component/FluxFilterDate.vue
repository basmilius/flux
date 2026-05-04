<template>
    <FluxDatePicker
        :class="$style.filterDatePicker"
        :max="max"
        :min="min"
        :model-value="currentValue"
        @update:model-value="onDatePicked"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterDateSpec } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '~flux/components/composable';
    import { defineFilter, pickFilterCommon } from '~flux/components/util';
    import FluxDatePicker from './FluxDatePicker.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

    type Props = FluxFilterDateSpec & {
        readonly max?: DateTime;
        readonly min?: DateTime;
    };

    defineFilter<Props>(p => ({
        ...pickFilterCommon(p),
        type: 'date',
        async getValueLabel(value) {
            if (!DateTime.isDateTime(value)) {
                return null;
            }

            return value.toLocaleString({
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
    }));

    const {
        name
    } = defineProps<Props>();

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => {
        const value = unref(state)[name];

        if (!value) {
            return null;
        }

        if (!DateTime.isDateTime(value)) {
            if (typeof value === 'string') {
                return DateTime.fromISO(value);
            }

            return null;
        }

        return value;
    });

    function onDatePicked(date: DateTime | DateTime[] | null): void {
        if (!DateTime.isDateTime(date)) {
            return;
        }

        setValue(name, date);
        back();
    }
</script>
