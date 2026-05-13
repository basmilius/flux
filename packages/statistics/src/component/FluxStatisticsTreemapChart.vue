<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildTreemapTooltipOptions, CHART_DEFAULT_COLORS, POLAR_BASE_OPTIONS, toTreemapSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        nodes,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly nodes: readonly FluxStatisticsChartTreemapNode[];
        readonly tooltip?: boolean;
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const echartsSeries = computed(() => [toTreemapSeries(nodes, CHART_DEFAULT_COLORS)]);

    const mergedOptions = computed<EChartsOption>(() => {
        const tooltipOptions: EChartsOption = tooltip
            ? buildTreemapTooltipOptions(t, $style as never)
            : { tooltip: { show: false } };

        return merge({}, POLAR_BASE_OPTIONS, tooltipOptions, advancedOptions, { series: echartsSeries.value });
    });
</script>
