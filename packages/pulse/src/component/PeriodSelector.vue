<template>
    <FluxSegmentedControl
        v-model="period"
        aria-label="Reporting period">
        <FluxSegmentedControlItem
            label="7 days"
            value="7d"/>
        <FluxSegmentedControlItem
            label="28 days"
            value="28d"/>
        <FluxSegmentedControlItem
            label="90 days"
            value="90d"/>
    </FluxSegmentedControl>
</template>

<script
    lang="ts"
    setup>
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useUiStore } from '@/store';
    import type { Period } from '@/types';

    const ui = useUiStore();

    const period = computed<string | number>({
        get: () => ui.period.value,
        set: value => ui.setPeriod(value as Period)
    });
</script>
