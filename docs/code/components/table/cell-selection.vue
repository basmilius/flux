<template>
    <FluxPane>
        <FluxPaneHeader
            title="Revenue by region"
            subtitle="Select a block of cells and copy it into a spreadsheet.">
            <template #after>
                <FluxSecondaryButton
                    icon-leading="copy"
                    label="Copy"
                    @click="table?.copy()"/>
            </template>
        </FluxPaneHeader>

        <FluxTable
            ref="table"
            is-cell-selectable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader>Region</FluxTableHeader>
                    <FluxTableHeader
                        v-for="quarter of quarters"
                        :key="quarter"
                        align="end"
                        is-numeric>{{ quarter }}
                    </FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow
                v-for="row of rows"
                :key="row.region">
                <FluxTableCell>{{ row.region }}</FluxTableCell>

                <FluxTableCell
                    v-for="(value, index) of row.values"
                    :key="index"
                    :copy-value="value">{{ formatAmount(value) }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneHeader, FluxSecondaryButton, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { useTemplateRef } from 'vue';

    const table = useTemplateRef('table');

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    const rows = [
        {region: 'Benelux', values: [128400, 141200, 137850, 152300]},
        {region: 'Nordics', values: [98250, 102400, 111900, 118650]},
        {region: 'DACH', values: [211300, 224750, 219400, 238100]},
        {region: 'Iberia', values: [74600, 81250, 79900, 88400]}
    ];

    function formatAmount(value: number): string {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0});
    }
</script>
