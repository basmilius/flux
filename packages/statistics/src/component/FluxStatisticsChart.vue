<template>
    <div :class="$style.statisticsChart">
        <ApexCharts
            ref="chart"
            :class="$style.statisticsChartElement"
            width="100%"
            height="100%"
            :options="merge({
                chart: {
                    height: '100%',
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0,
                    parentHeightOffset: 0,
                    redrawOnParentResize: false,
                    redrawOnWindowResize: false,
                    animations: {
                        enabled: true,
                        speed: 300,
                        animateGradually: {
                            enabled: false,
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
                    },
                    events: {
                        mounted: (context: any) => {
                            const svg = context.el.querySelector('svg');
                            svg?.querySelectorAll('title').forEach((t: HTMLTitleElement) => t.remove());
                        },
                        updated: (context: any) => {
                            const svg = context.el.querySelector('svg');
                            svg?.querySelectorAll('title').forEach((t: HTMLTitleElement) => t.remove());
                        }
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
                    borderColor: 'var(--stroke)',
                    padding: {
                        top: 0,
                        left: -3,
                        right: -3,
                        bottom: 0
                    }
                },
                legend: {
                    show: false
                },
                plotOptions: {
                    bar: {
                        borderRadius: 6,
                        columnWidth: '75%'
                    },
                    donut: {
                        expandOnClick: false
                    },
                    pie: {
                        expandOnClick: false
                    }
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    }
                },
                title: {
                    text: undefined
                },
                tooltip: {
                    custom: generateTooltip,
                    followCursor: false,
                    hideEmptySeries: true,
                    onDatasetHover: {
                        highlightDataSeries: true
                    }
                },
                xaxis: {
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    crosshairs: { show: true },
                    tooltip: { enabled: false }
                },
                yaxis: {
                    show: false,
                    labels: { show: false }
                }
            }, options, {series})"
            :series="series"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useResizeObserver } from '@basmilius/common';
    import { formatNumber } from '@basmilius/utils';
    import type { ApexOptions } from 'apexcharts';
    import { merge } from 'lodash-es';
    import { toRaw, unref, useTemplateRef } from 'vue';
    import { useI18n } from 'vue-i18n';
    import ApexCharts from 'vue3-apexcharts';
    import $style from '$fluxStatistics/css/Chart.module.scss';

    const {
        options = {}
    } = defineProps<{
        readonly options?: ApexOptions;
        readonly series: ApexOptions['series'];
    }>();

    const chart = useTemplateRef('chart');
    const {t} = useI18n({useScope: 'parent'});

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

        let labels: string[];

        if (w.globals.categoryLabels && w.globals.categoryLabels.length > 0) {
            labels = w.globals.categoryLabels;
        } else if (w.globals.labels && w.globals.labels.length > 0) {
            labels = w.globals.labels;
        }

        return `${labels && dataPointIndex !== null && labels[dataPointIndex] ? `
                    <div class="${$style.statisticsChartTooltipTitle}">
                        ${t(labels[dataPointIndex])}
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
                </div>`;
    }

    function formatSeriesValue(w: any, dataPointIndex: number | null, seriesIndex: number): string {
        const value = dataPointIndex !== null
            ? w.globals.series[seriesIndex][dataPointIndex]
            : w.globals.series[seriesIndex];

        if (w.config.tooltip.y.formatter) {
            return w.config.tooltip.y.formatter(value, {dataPointIndex, seriesIndex});
        }

        if (Number.isInteger(value)) {
            return formatNumber(value);
        }

        return value;
    }
</script>
