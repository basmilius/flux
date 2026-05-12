<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Goal progress"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [62, 48, 80];

    const options: ApexOptions = {
        labels: ['Q1', 'Q2', 'Q3'],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    total: {
                        show: true,
                        label: 'Average',
                        color: 'var(--foreground-secondary)',
                        fontSize: '13px',
                        fontWeight: 500,
                        formatter() {
                            return '63%';
                        }
                    }
                }
            }
        }
    };
</script>
