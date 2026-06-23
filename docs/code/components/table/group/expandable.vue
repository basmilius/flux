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
                    v-model:is-expanded="isEngineeringExpanded"
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
                    v-model:is-expanded="isDesignExpanded"
                    icon="palette"
                    label="Design"
                    is-expandable>
                    <template #after>
                        <FluxBadge label="1"/>
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
    import { FluxBadge, FluxPane, FluxTable, FluxTableCell, FluxTableGroup, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { ref } from 'vue';

    const isEngineeringExpanded = ref(true);
    const isDesignExpanded = ref(false);
</script>
