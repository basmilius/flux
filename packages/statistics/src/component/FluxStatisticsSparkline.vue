<template>
    <div
        data-sparkline
        :class="$style.statisticsSparkline"
        :style="{
            '--color': resolvedColor
        }">
        <div
            ref="chart"
            :class="$style.statisticsSparklineChart"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, useTemplateRef } from 'vue';
    import { type EChartsOption, useECharts } from '~flux/statistics/composable';
    import { buildSparklineOptions, deepResolveCssVars, type SparklineSeriesItem, useCssVarVersion } from '~flux/statistics/util';
    import $style from '~flux/statistics/css/Sparkline.module.scss';

    const {
        color,
        options = {},
        series,
        variant = 'line'
    } = defineProps<{
        readonly color?: FluxColor | `#${string}`;
        readonly options?: EChartsOption;
        readonly series: readonly SparklineSeriesItem[];
        readonly variant?: 'line' | 'bar' | 'area';
    }>();

    const FLUX_COLORS: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];

    const chart = useTemplateRef('chart');

    const themeVersion = useCssVarVersion();

    const resolvedColor = computed(() => {
        if (!color) {
            return undefined;
        }

        if (FLUX_COLORS.includes(color as FluxColor)) {
            return `var(--${color}-solid)`;
        }

        return color;
    });

    const mergedOptions = computed<EChartsOption>(() => {
        themeVersion.value;

        const merged = merge(
            {},
            buildSparklineOptions(variant, resolvedColor.value ?? 'var(--chart-1)', series),
            options
        );

        return deepResolveCssVars(merged, chart.value);
    });

    useECharts(chart, mergedOptions);
</script>
