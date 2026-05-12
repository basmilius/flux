<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'line'
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
            fill: {
                type: ['solid', 'solid', 'gradient'],
                gradient: {
                    opacityFrom: 0.45,
                    opacityTo: 0
                }
            },
            markers: {
                size: 0,
                strokeWidth: 2,
                strokeColors: 'var(--surface)',
                hover: {
                    size: 6
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: '55%'
                }
            },
            stroke: {
                curve: 'smooth',
                width: [3, 0, 2]
            },
            tooltip: {
                shared: true,
                intersect: false
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
