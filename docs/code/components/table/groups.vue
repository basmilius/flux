<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="200">Name</FluxTableHeader>
                <FluxTableHeader is-shrinking>Role</FluxTableHeader>
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

    type Group = {
        readonly name: string;
        readonly icon: FluxIconName;
        readonly members: { readonly name: string; readonly role: string }[];
    };

    const groups: Group[] = [
        {
            name: 'Engineering',
            icon: 'users',
            members: [
                {name: 'Ada Lovelace', role: 'Lead'},
                {name: 'Alan Turing', role: 'Engineer'}
            ]
        },
        {
            name: 'Design',
            icon: 'palette',
            members: [
                {name: 'Grace Hopper', role: 'Designer'}
            ]
        },
        {
            name: 'Operations',
            icon: 'folder',
            members: [
                {name: 'Katherine Johnson', role: 'Manager'},
                {name: 'Margaret Hamilton', role: 'Analyst'}
            ]
        }
    ];

    const expanded = reactive<Record<string, boolean>>({
        Engineering: true,
        Design: true,
        Operations: false
    });
</script>
