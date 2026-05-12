<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'radar',
                dropShadow: {
                    enabled: false
                }
            },
            fill: {
                opacity: 0.25
            },
            grid: {
                show: false
            },
            markers: {
                size: 4,
                strokeWidth: 2,
                strokeColors: 'var(--surface)',
                hover: {
                    size: 6
                }
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'var(--stroke)',
                        connectorColors: 'var(--stroke)',
                        fill: {
                            colors: ['transparent']
                        }
                    }
                }
            },
            stroke: {
                width: 2.5,
                dashArray: 0
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
                show: false
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
