<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'bar'
            },
            grid: {
                show: true,
                clipMarkers: false,
                padding: {
                    top: 21,
                    left: 9,
                    right: 9
                }
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
