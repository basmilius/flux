<template>
    <Preview>
        <FluxPane style="min-width: 300px">
            <FluxPaneBody>
                <FluxStatisticsDetailsTable>
                    <FluxStatisticsDetailsTableRow
                        label="Status"
                        value="Paid"/>
                    <FluxStatisticsDetailsTableRow
                        label="Total"
                        value="€ 149.99"/>
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
