<template>
    <FluxStatisticsBase
        style="min-width: 100%; max-width: 360px"
        icon="file-lines"
        title="Invoice #2026-0148">
        <FluxStatisticsDetailsTable title="Summary">
            <FluxStatisticsDetailsTableRow
                label="Subtotal"
                value="€ 1,240.00"/>
            <FluxStatisticsDetailsTableRow
                label="VAT (21%)"
                value="€ 260.40"/>
            <FluxStatisticsDetailsTableRow
                label="Total"
                value="€ 1,500.40"/>
            <FluxStatisticsDetailsTableRow
                label="Status"
                value="Paid"/>
        </FluxStatisticsDetailsTable>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBase, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow } from '@flux-ui/statistics';
</script>
