<template>
    <FluxDatePicker
        class="flux-filter-date"
        :max="max"
        :min="min"
        :model-value="currentValue"
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

    export interface Props {
        readonly icon?: IconNames;
        readonly label: string;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly name: string;
    }

    const props = defineProps<Props>();

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => {
        const value = unref(state)[props.name];

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

        setValue(props.name, date);
        back();
    }
</script>

<style lang="scss">
    .flux-filter-date {
        margin: -9px;
    }
</style>
