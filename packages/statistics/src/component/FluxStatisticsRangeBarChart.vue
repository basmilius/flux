<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'rangeBar'
            },
            dataLabels: {
                enabled: false
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
                bar: {
                    horizontal: true,
                    borderRadius: 6,
                    barHeight: '60%',
                    borderRadiusApplication: 'around',
                    rangeBarGroupRows: true
                }
            },
            stroke: {
                width: 1,
                colors: ['var(--surface)']
            },
            tooltip: {
                custom: undefined,
                x: {
                    format: 'dd MMM yyyy'
                }
            },
            xaxis: {
                type: 'datetime',
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
