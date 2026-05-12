<template>
    <div style="width: 100%; max-width: 240px">
        <FluxStatisticsSparkline
            variant="area"
            color="success"
            :series="series"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsSparkline } from '@flux-ui/statistics';

    const series = [{
        name: 'Traffic',
        data: [180, 210, 240, 220, 280, 310, 290, 340, 360, 400]
    }];
</script>
