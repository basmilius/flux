<template>
    <FluxPane>
        <FluxDataTable
            :group-by="item => item.team"
            :items="dataSet"
            :limits="[]"
            :page="1"
            :per-page="dataSet.length"
            :total="dataSet.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader is-shrinking>Role</FluxTableHeader>
            </template>

            <template #group="{id, items}">
                <FluxTableGroup :label="String(id)">
                    <template #after>
                        <FluxBadge :label="`${items.length}`"/>
                    </template>
                </FluxTableGroup>
            </template>

            <template #name="{item}">
                <FluxTableCell content-direction="column">
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.email }}</small>
                </FluxTableCell>
            </template>

            <template #role="{item}">
                <FluxTableCell>
                    {{ item.role }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableGroup, FluxTableHeader } from '@flux-ui/components';

    const dataSet = [
        {id: 1, team: 'Engineering', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Lead'},
        {id: 2, team: 'Engineering', name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer'},
        {id: 3, team: 'Design', name: 'Grace Hopper', email: 'grace@example.com', role: 'Designer'},
        {id: 4, team: 'Operations', name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Manager'},
        {id: 5, team: 'Operations', name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer'}
    ];
</script>
