<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader>Name</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow>
                <FluxTableCell>Ada Lovelace</FluxTableCell>
                <FluxTableCell>Planned</FluxTableCell>
            </FluxTableRow>

            <FluxTableSeparator/>

            <FluxTableRow>
                <FluxTableCell>Alan Turing</FluxTableCell>
                <FluxTableCell>Available</FluxTableCell>
            </FluxTableRow>

            <FluxTableRow>
                <FluxTableCell>Grace Hopper</FluxTableCell>
                <FluxTableCell>Available</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTableSeparator } from '@flux-ui/components';
</script>
