<template>
    <div style="width: 100%; max-width: 240px">
        <FluxStatisticsSparkline
            variant="line"
            color="primary"
            :series="series"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsSparkline } from '@flux-ui/statistics';

    const series = [{
        name: 'Revenue',
        data: [22, 28, 26, 32, 31, 38, 42, 41, 48, 52]
    }];
</script>
