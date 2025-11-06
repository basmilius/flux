<template>
    <FluxStatistic style="max-width: 350px"
        icon="user-plus"
        color="success"
        label="New users this month"
        value="20"
        change-color="success"
        change-value="5%"
        change-icon="arrow-trend-up"/>
</template>

<script
    setup
    lang="ts">
    import { FluxStatistic } from '@flux-ui/components';
</script>
