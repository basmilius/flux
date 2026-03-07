<template>
    <Preview>
        <FluxPane style="min-width: 300px">
            <FluxPaneBody>
                <FluxStatisticsDetailsTable title="Order details">
                    <FluxStatisticsDetailsTableRow
                        label="Order ID"
                        value="#ORD-00482"/>
                    <FluxStatisticsDetailsTableRow
                        label="Status"
                        value="Paid"/>
                    <FluxStatisticsDetailsTableRow
                        label="Customer"
                        value="John Doe"/>
                    <FluxStatisticsDetailsTableRow
                        label="Total"
                        value="€ 149.99"/>
                    <FluxStatisticsDetailsTableRow
                        label="Date"
                        value="March 7, 2026"/>
                </FluxStatisticsDetailsTable>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow } from '@flux-ui/statistics';
</script>
