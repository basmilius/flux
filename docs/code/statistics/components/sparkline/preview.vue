<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="18"
            style="width: 100%; max-width: 380px">
            <FluxStatisticsMetric
                style="min-width: 100%"
                icon="users"
                title="Active users"
                label="This week"
                value="1,284"
                :change="{ color: 'success', icon: 'arrow-trend-up', value: '+8.4%' }">
                <FluxStatisticsSparkline
                    color="success"
                    variant="area"
                    :series="series"/>
            </FluxStatisticsMetric>
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsMetric, FluxStatisticsSparkline } from '@flux-ui/statistics';

    const series = [{
        name: 'Active users',
        data: [820, 840, 860, 900, 950, 970, 1010, 1080, 1140, 1210, 1240, 1284]
    }];
</script>
