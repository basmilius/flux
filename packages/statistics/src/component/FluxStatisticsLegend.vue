<template>
    <div :class="$style.statisticsLegend">
        <slot v-if="hasSlot"/>
        <FluxStatisticsLegendItem
            v-else
            v-for="item in autoItems"
            :key="item.label"
            :color="item.color as `#${string}` | undefined"
            :icon="item.icon"
            :label="item.label"
            :value="item.value"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, inject, useSlots } from 'vue';
    import { FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import FluxStatisticsLegendItem from './FluxStatisticsLegendItem.vue';
    import $style from '~flux/statistics/css/Legend.module.scss';

    const slots = useSlots();
    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const hasSlot = computed(() => !!slots.default);
    const autoItems = computed(() => legendContext?.items.value ?? []);
</script>
