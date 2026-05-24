<template>
    <slot/>
</template>

<script
    lang="ts"
    setup>
    import { provide } from 'vue';
    import { createChartLegendContext, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';

    defineSlots<{
        default(): any;
    }>();

    provide(FluxStatisticsChartLegendInjectionKey, createChartLegendContext());
</script>
