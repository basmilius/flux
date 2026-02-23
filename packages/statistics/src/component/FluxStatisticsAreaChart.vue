<template>
    <FluxStatisticsChart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            fill: {
                gradient: {
                    enabled: true,
                    opacityFrom: 0.5,
                    opacityTo: 0
                }
            },
            grid: {
                show: true,
                clipMarkers: false
            },
            legend: {
                show: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                labels: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                tooltip: {
                    enabled: false
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
    import FluxStatisticsChart from './FluxStatisticsChart.vue';

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
