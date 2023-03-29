<template>
    <flux-date-picker
        class="flux-filter-date"
        :max="max"
        :min="min"
        :model-value="currentValue"
        @update:model-value="onDatePicked"/>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { DateTime } from 'luxon';
    import { computed, inject, unref } from 'vue-demi';
    import { FluxDatePicker } from '.';

    export interface Props {
        readonly icon?: IconNames;
        readonly label: string;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly name: string;
    }

    const props = defineProps<Props>();

    const {back, state, setValue} = inject<any>('flux-filter');

    const currentValue = computed(() => {
        const value = unref(state)[props.name];

        if (!value) {
            return null;
        }

        if (!DateTime.isDateTime(value)) {
            return DateTime.fromISO(value);
        }

        return value;
    });

    function onDatePicked(date: DateTime): void {
        setValue(props.name, date);
        back();
    }
</script>

<style lang="scss">
    @layer component {
        .flux-filter-date {
            margin: -9px;
        }
    }
</style>
