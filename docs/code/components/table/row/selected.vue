<template>
    <FluxPane>
        <FluxTable>
            <FluxTableRow
                v-for="person in dataSet"
                :key="person.id"
                :is-selected="person.id === 2">
                <FluxTableCell>{{ person.name }}</FluxTableCell>
                <FluxTableCell>{{ person.role }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableRow } from '@flux-ui/components';

    const dataSet = [
        {id: 1, name: 'Alice Johnson', role: 'Designer'},
        {id: 2, name: 'Bas Milius', role: 'Engineer'},
        {id: 3, name: 'Carol White', role: 'Product Manager'}
    ];
</script>
