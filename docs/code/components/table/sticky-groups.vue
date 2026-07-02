<template>
    <FluxPane>
        <FluxTable
            is-hoverable
            is-sticky
            style="max-height: 360px">
            <template #header>
                <FluxTableHeader :min-width="200">Name</FluxTableHeader>
                <FluxTableHeader :min-width="160">Role</FluxTableHeader>
                <FluxTableHeader is-shrinking>Location</FluxTableHeader>
            </template>

            <FluxTableGroup
                v-for="group in groups"
                :key="group.name"
                v-model:is-expanded="expanded[group.name]"
                :icon="group.icon"
                :label="group.name"
                is-expandable>
                <template #after>
                    <FluxBadge :label="`${group.members.length}`"/>
                </template>

                <FluxTableRow
                    v-for="member in group.members"
                    :key="member.name">
                    <FluxTableCell>{{ member.name }}</FluxTableCell>
                    <FluxTableCell>{{ member.role }}</FluxTableCell>
                    <FluxTableCell no-wrap>{{ member.location }}</FluxTableCell>
                </FluxTableRow>
            </FluxTableGroup>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxPane, FluxTable, FluxTableCell, FluxTableGroup, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { reactive } from 'vue';

    type Member = {
        readonly name: string;
        readonly role: string;
        readonly location: string;
    };

    type Group = {
        readonly name: string;
        readonly icon: FluxIconName;
        readonly members: Member[];
    };

    const groups: Group[] = [
        {
            name: 'Engineering',
            icon: 'users',
            members: [
                {name: 'Ada Lovelace', role: 'Lead', location: 'London'},
                {name: 'Alan Turing', role: 'Engineer', location: 'Manchester'},
                {name: 'Linus Powell', role: 'Engineer', location: 'Berlin'},
                {name: 'Nadia Reyes', role: 'Engineer', location: 'Madrid'}
            ]
        },
        {
            name: 'Design',
            icon: 'palette',
            members: [
                {name: 'Grace Hopper', role: 'Lead designer', location: 'New York'},
                {name: 'Theo Marsh', role: 'Product designer', location: 'Toronto'},
                {name: 'Lena Ortiz', role: 'Brand designer', location: 'Lisbon'}
            ]
        },
        {
            name: 'Operations',
            icon: 'folder',
            members: [
                {name: 'Katherine Johnson', role: 'Manager', location: 'Hampton'},
                {name: 'Margaret Hamilton', role: 'Analyst', location: 'Boston'},
                {name: 'Sven Halloran', role: 'Coordinator', location: 'Oslo'}
            ]
        },
        {
            name: 'Sales',
            icon: 'chart-line',
            members: [
                {name: 'Mila Vega', role: 'Account lead', location: 'Amsterdam'},
                {name: 'Priya Nandal', role: 'Account manager', location: 'Mumbai'},
                {name: 'Oscar Bright', role: 'Sales rep', location: 'Chicago'}
            ]
        }
    ];

    const expanded = reactive<Record<string, boolean>>({
        Engineering: true,
        Design: true,
        Operations: true,
        Sales: true
    });
</script>
