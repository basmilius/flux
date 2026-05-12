<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'heatmap'
            },
            colors: [blue500],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                padding: {
                    top: 6,
                    left: 6,
                    right: 6,
                    bottom: 0
                }
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.65,
                    radius: 6,
                    useFillColorAsStroke: false,
                    distributed: false,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 25, color: blue100, name: 'low' },
                            { from: 26, to: 50, color: blue300, name: 'medium' },
                            { from: 51, to: 75, color: blue500, name: 'high' },
                            { from: 76, to: 100, color: blue700, name: 'very high' }
                        ]
                    }
                }
            },
            stroke: {
                width: 2,
                colors: ['var(--surface)']
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
    import { blue100, blue300, blue500, blue700 } from '@flux-ui/internals';
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
