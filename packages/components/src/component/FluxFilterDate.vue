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
    import type { FluxIconName } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '$flux/composable';
    import FluxDatePicker from './FluxDatePicker.vue';
    import $style from '$flux/css/component/Filter.module.scss';

    const {
        name
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly label: string;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly name: string;
    }>();

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
