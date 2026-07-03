<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader>Name</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Role</FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableGroup
                icon="gear"
                label="Engineering">
                <FluxTableRow>
                    <FluxTableCell>Ada Lovelace</FluxTableCell>
                    <FluxTableCell>Lead</FluxTableCell>
                </FluxTableRow>

                <FluxTableRow>
                    <FluxTableCell>Alan Turing</FluxTableCell>
                    <FluxTableCell>Engineer</FluxTableCell>
                </FluxTableRow>
            </FluxTableGroup>

            <FluxTableGroup
                icon="palette"
                label="Design">
                <FluxTableRow>
                    <FluxTableCell>Grace Hopper</FluxTableCell>
                    <FluxTableCell>Designer</FluxTableCell>
                </FluxTableRow>
            </FluxTableGroup>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableGroup, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
