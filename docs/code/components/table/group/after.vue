<template>
    <Preview>
        <FluxPane style="width: min(100%, 540px)">
            <FluxTable>
                <template #header>
                    <FluxTableRow>
                        <FluxTableHeader>Name</FluxTableHeader>
                        <FluxTableHeader is-shrinking>Role</FluxTableHeader>
                    </FluxTableRow>
                </template>

                <FluxTableGroup
                    icon="users"
                    label="Engineering">
                    <template #after>
                        <FluxBadge
                            color="primary"
                            label="2 members"/>

                        <FluxSecondaryButton
                            icon-leading="plus"
                            size="small"/>
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
                    <template #after>
                        <FluxBadge
                            color="primary"
                            label="1 member"/>

                        <FluxSecondaryButton
                            icon-leading="plus"
                            size="small"/>
                    </template>

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
    import { FluxBadge, FluxPane, FluxSecondaryButton, FluxTable, FluxTableCell, FluxTableGroup, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
