<template>
    <div :class="$style.statisticsLegend">
        <slot v-if="hasSlot"/>
        <FluxStatisticsLegendItem
            v-else
            v-for="(item, index) in autoItems"
            :key="item.label"
            :color="item.color as `#${string}` | undefined"
            :icon="item.icon"
            :is-hovered="legendContext?.hoveredIndex.value === index"
            :label="item.label"
            :value="item.value"
            @mouseenter="onItemMouseEnter(index)"
            @mouseleave="onItemMouseLeave"/>
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

    function onItemMouseEnter(index: number): void {
        if (legendContext) {
            legendContext.hoveredIndex.value = index;
        }
    }

    function onItemMouseLeave(): void {
        if (legendContext) {
            legendContext.hoveredIndex.value = null;
        }
    }
</script>
