<template>
    <div
        ref="chart"
        :class="$style.statisticsChart"/>
</template>

<script
    lang="ts"
    setup>
    import { merge } from 'lodash-es';
    import { computed, useTemplateRef } from 'vue';
    import { type EChartsOption, useECharts } from '~flux/statistics/composable';
    import { buildDefaultOptions, deepResolveCssVars } from '~flux/statistics/util';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        options = {}
    } = defineProps<{
        readonly options?: EChartsOption;
    }>();

    const chart = useTemplateRef('chart');

    const defaults = buildDefaultOptions();

    const mergedOptions = computed<EChartsOption>(() => {
        const merged = merge({}, defaults, options) as EChartsOption & { color?: unknown; series?: unknown };

        if (options && (options as { color?: unknown }).color !== undefined) {
            merged.color = (options as { color: unknown }).color;
        }

        if (options && (options as { series?: unknown }).series !== undefined) {
            merged.series = (options as { series: unknown }).series;
        }

        return deepResolveCssVars(merged);
    });

    const {chartInstance} = useECharts(chart, mergedOptions);

    defineExpose({chartInstance});
</script>
