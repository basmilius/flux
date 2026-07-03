<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <template #header>
                    <FluxTableRow>
                        <FluxTableHeader>Name</FluxTableHeader>
                        <FluxTableHeader is-shrinking>Role</FluxTableHeader>
                    </FluxTableRow>
                </template>

                <FluxTableGroup
                    icon="users"
                    label="Engineering"
                    is-expandable>
                    <template #after>
                        <FluxBadge label="2"/>
                    </template>

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
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxPane, FluxTable, FluxTableCell, FluxTableGroup, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
