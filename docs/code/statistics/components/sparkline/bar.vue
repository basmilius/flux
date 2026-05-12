<template>
    <div style="width: 100%; max-width: 240px">
        <FluxStatisticsSparkline
            variant="bar"
            color="info"
            :series="series"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsSparkline } from '@flux-ui/statistics';

    const series = [{
        name: 'Sales',
        data: [12, 18, 14, 22, 20, 26, 24, 30, 28, 34]
    }];
</script>
