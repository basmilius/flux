<template>
    <FluxStatisticsDetailsTable title="Shipment details">
        <FluxStatisticsDetailsTableRow
            label="Carrier"
            value="DHL Express"/>
        <FluxStatisticsDetailsTableRow
            label="Tracking number"
            value="JD014600006281230897"/>
        <FluxStatisticsDetailsTableRow
            label="Estimated delivery"
            value="March 10, 2026"/>
        <FluxStatisticsDetailsTableRow
            label="Weight"
            value="2.4 kg"/>
    </FluxStatisticsDetailsTable>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow } from '@flux-ui/statistics';
</script>
