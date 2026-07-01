<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader :width="120">Code</FluxTableHeader>
                <FluxTableHeader>Description</FluxTableHeader>
                <FluxTableHeader
                    align="end"
                    :width="150">
                    Amount
                </FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="row in rows"
                :key="row.code">
                <FluxTableCell no-wrap>{{ row.code }}</FluxTableCell>
                <FluxTableCell>{{ row.description }}</FluxTableCell>
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ row.amount }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    const rows = [
        {code: 'INV-001', description: 'Aurora Lamp — matte black finish', amount: '€ 49.00'},
        {code: 'INV-002', description: 'Borealis Desk with adjustable legs', amount: '€ 329.00'},
        {code: 'INV-003', description: 'Cinder Mug, set of four', amount: '€ 58.00'}
    ];
</script>
