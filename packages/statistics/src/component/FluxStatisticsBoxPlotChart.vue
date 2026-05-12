<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'boxPlot'
            },
            grid: {
                show: true,
                clipMarkers: false,
                strokeDashArray: 3,
                padding: {
                    top: 18,
                    left: 9,
                    right: 9
                }
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: 'var(--chart-1)',
                        lower: 'var(--chart-3)'
                    }
                }
            },
            stroke: {
                width: 1,
                colors: ['var(--foreground-prominent)']
            },
            tooltip: {
                custom: undefined,
                shared: false,
                intersect: true
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: 'var(--foreground-secondary)',
                        fontSize: '12px',
                        fontWeight: 500
                    }
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    style: {
                        colors: 'var(--foreground-secondary)',
                        fontSize: '12px',
                        fontWeight: 500
                    }
                }
            }
        }, options)"
        :series="translatedSeries"/>
</template>

<script
    lang="ts"
    setup>
    import type { ApexOptions } from 'apexcharts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly aspectRatio?: number;
        readonly options?: ApexOptions;
        readonly series: ApexOptions['series'];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const translatedSeries = computed(() => {
        return (series as any).map((seriesItem: any) => ({
            ...seriesItem,
            name: t(seriesItem.name as string)
        }));
    });
</script>
