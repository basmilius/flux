<template>
    <FluxStatisticsBase
        icon="receipt"
        title="Latest invoices"
        style="min-width: 100%; max-width: 360px">
        <template #content>
            <FluxStatisticsDetailsTable title="This month">
                <FluxStatisticsDetailsTableRow
                    label="2026-0148"
                    value="€ 1,500.40"/>
                <FluxStatisticsDetailsTableRow
                    label="2026-0147"
                    value="€ 320.00"/>
                <FluxStatisticsDetailsTableRow
                    label="2026-0146"
                    value="€ 89.95"/>
            </FluxStatisticsDetailsTable>
        </template>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBase, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow } from '@flux-ui/statistics';
</script>
