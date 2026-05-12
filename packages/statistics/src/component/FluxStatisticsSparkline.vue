<template>
    <div
        data-sparkline
        :class="$style.statisticsSparkline"
        :style="{
            '--color': resolvedColor
        }">
        <ApexCharts
            :class="$style.statisticsSparklineChart"
            width="100%"
            height="100%"
            :type="chartType"
            :options="chartOptions"
            :series="series"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import type { ApexOptions } from 'apexcharts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import ApexCharts from 'vue3-apexcharts';
    import $style from '~flux/statistics/css/Sparkline.module.scss';

    const FLUX_COLORS: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];

    const {
        color,
        options = {},
        variant = 'line'
    } = defineProps<{
        readonly color?: FluxColor | `#${string}`;
        readonly options?: ApexOptions;
        readonly series: ApexOptions['series'];
        readonly variant?: 'line' | 'bar' | 'area';
    }>();

    const chartType = computed(() => variant);

    const resolvedColor = computed(() => {
        if (!color) {
            return;
        }

        if (FLUX_COLORS.includes(color as FluxColor)) {
            return `var(--${color}-600)`;
        }

        return color;
    });

    const chartOptions = computed<ApexOptions>(() => merge({
        chart: {
            type: variant,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: [resolvedColor.value ?? 'var(--chart-1)'],
        dataLabels: {
            enabled: false
        },
        fill: variant === 'area'
            ? {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.5,
                    opacityTo: 0
                }
            }
            : {
                type: 'solid',
                opacity: 1
            },
        grid: {
            show: false,
            padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                borderRadius: 2
            }
        },
        stroke: {
            curve: 'smooth',
            width: variant === 'bar' ? 0 : 2
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            show: false
        }
    }, options));
</script>
