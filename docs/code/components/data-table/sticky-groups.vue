<template>
    <FluxPane>
        <FluxDataTable
            v-model:collapsed-groups="collapsedGroups"
            :group-by="item => item.team"
            :items="members"
            :limits="[]"
            :page="1"
            :per-page="members.length"
            :total="members.length"
            unique-key="id"
            is-hoverable
            is-sticky
            style="max-height: 360px">
            <template #header>
                <FluxTableHeader :min-width="220">Name</FluxTableHeader>
                <FluxTableHeader :min-width="160">Role</FluxTableHeader>
                <FluxTableHeader is-shrinking>Location</FluxTableHeader>
            </template>

            <template #group="{id, items, isExpanded, toggle}">
                <FluxTableGroup
                    :icon="teamIcon[id]"
                    :is-expanded="isExpanded"
                    :label="String(id)"
                    is-expandable
                    @update:is-expanded="toggle">
                    <template #after>
                        <FluxBadge :label="`${items.length}`"/>
                    </template>
                </FluxTableGroup>
            </template>

            <template #name="{item}">
                <FluxTableCell
                    content-direction="column"
                    :content-gap="3">
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.email }}</small>
                </FluxTableCell>
            </template>

            <template #role="{item}">
                <FluxTableCell>{{ item.role }}</FluxTableCell>
            </template>

            <template #location="{item}">
                <FluxTableCell no-wrap>{{ item.location }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableGroup, FluxTableHeader } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { ref } from 'vue';

    type Member = {
        readonly id: number;
        readonly team: string;
        readonly name: string;
        readonly email: string;
        readonly role: string;
        readonly location: string;
    };

    const teamIcon: Record<string, FluxIconName> = {
        Engineering: 'users',
        Design: 'palette',
        Operations: 'folder',
        Sales: 'chart-line'
    };

    const members: Member[] = [
        {id: 1, team: 'Engineering', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Lead', location: 'London'},
        {id: 2, team: 'Engineering', name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer', location: 'Manchester'},
        {id: 3, team: 'Engineering', name: 'Linus Powell', email: 'linus@example.com', role: 'Engineer', location: 'Berlin'},
        {id: 4, team: 'Engineering', name: 'Nadia Reyes', email: 'nadia@example.com', role: 'Engineer', location: 'Madrid'},
        {id: 5, team: 'Design', name: 'Grace Hopper', email: 'grace@example.com', role: 'Lead designer', location: 'New York'},
        {id: 6, team: 'Design', name: 'Theo Marsh', email: 'theo@example.com', role: 'Product designer', location: 'Toronto'},
        {id: 7, team: 'Design', name: 'Lena Ortiz', email: 'lena@example.com', role: 'Brand designer', location: 'Lisbon'},
        {id: 8, team: 'Operations', name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Manager', location: 'Hampton'},
        {id: 9, team: 'Operations', name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Analyst', location: 'Boston'},
        {id: 10, team: 'Operations', name: 'Sven Halloran', email: 'sven@example.com', role: 'Coordinator', location: 'Oslo'},
        {id: 11, team: 'Sales', name: 'Mila Vega', email: 'mila@example.com', role: 'Account lead', location: 'Amsterdam'},
        {id: 12, team: 'Sales', name: 'Priya Nandal', email: 'priya@example.com', role: 'Account manager', location: 'Mumbai'},
        {id: 13, team: 'Sales', name: 'Oscar Bright', email: 'oscar@example.com', role: 'Sales rep', location: 'Chicago'}
    ];

    const collapsedGroups = ref<string[]>([]);
</script>
