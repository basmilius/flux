<template>
    <div :class="$style.statisticsChart">
        <ApexCharts
            ref="chart"
            :class="$style.statisticsChartElement"
            width="100%"
            height="100%"
            :options="merge({
                chart: {
                    redrawOnParentResize: false,
                    redrawOnWindowResize: false,
                    animations: {
                        enabled: false,
                        speed: 300,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 150
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                colors: [
                    'var(--chart-1)',
                    'var(--chart-2)',
                    'var(--chart-3)',
                    'var(--chart-4)'
                ],
                dataLabels: {
                    enabled: false
                },
                grid: {
                    borderColor: 'var(--stroke)'
                },
                legend: {
                    show: false
                },
                tooltip: {
                    custom: generateTooltip,
                    followCursor: false,
                    fixed: {
                        enabled: true,
                        position: 'topLeft',
                        offsetX: 9,
                        offsetY: 9
                    }
                }
            }, {
                ...options,
                series: undefined
            })"
            :series="series"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useResizeObserver } from '@flux-ui/internals';
    import type { ApexOptions } from 'apexcharts';
    import { merge } from 'lodash-es';
    import { toRaw, unref, useTemplateRef } from 'vue';
    import ApexCharts from 'vue3-apexcharts';
    import $style from '$fluxStatistics/css/Chart.module.scss';

    const {
        options = {}
    } = defineProps<{
        readonly options?: ApexOptions;
        readonly series: ApexOptions['series'];
    }>();

    const chart = useTemplateRef('chart');

    useResizeObserver(chart, () => {
        const _chart = unref(chart);

        if (!_chart) {
            return;
        }

        // @ts-ignore Update exists.
        _chart.chart?.update();
    });

    function generateTooltip({dataPointIndex, w}: { dataPointIndex: number | null; w: any; }): string {
        w = toRaw(w);

        return `<div class="${$style.statisticsChartTooltip}">
                    ${dataPointIndex !== null ? `
                        <div class="${$style.statisticsChartTooltipTitle}">
                            ${w.globals.categoryLabels[dataPointIndex]}
                        </div>
                    ` : ''}

                    <div class="${$style.statisticsChartTooltipBody}">
                        ${w.globals.series.map((_: any, index: number) => `
                            <div class="${$style.statisticsChartTooltipSeriesColor}" style="background: ${w.globals.seriesColors[index] ?? w.globals.colors[index]}"></div>

                            <div class="${$style.statisticsChartTooltipSeriesName}">
                                ${w.globals.seriesNames[index]}
                            </div>

                            <div class="${$style.statisticsChartTooltipSeriesValue}">
                                ${formatSeriesValue(w, dataPointIndex, index)}
                            </div>
                        `).join('')}
                    </div>
                </div>`;
    }

    function formatSeriesValue(w: any, dataPointIndex: number | null, seriesIndex: number): Function {
        const value = dataPointIndex !== null
            ? w.globals.series[seriesIndex][dataPointIndex]
            : w.globals.series[seriesIndex];

        if (w.config.tooltip.y.formatter) {
            return w.config.tooltip.y.formatter(value, {dataPointIndex, seriesIndex});
        }

        return value;
    }
</script>
