<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="220">Member</FluxTableHeader>
                <FluxTableHeader :min-width="160">Role</FluxTableHeader>
                <FluxTableHeader is-shrinking>Location</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="member in members"
                :key="member.email">
                <FluxTableCell
                    content-direction="column"
                    :content-gap="3">
                    <strong>{{ member.name }}</strong>
                    <small>{{ member.email }}</small>
                </FluxTableCell>

                <FluxTableCell
                    content-direction="column"
                    :content-gap="3">
                    <span>{{ member.role }}</span>
                    <small>{{ member.department }}</small>
                </FluxTableCell>

                <FluxTableCell>{{ member.location }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    type Member = {
        readonly name: string;
        readonly email: string;
        readonly role: string;
        readonly department: string;
        readonly location: string;
    };

    const members: Member[] = [
        {name: 'Ada Lovelace', email: 'ada@example.com', role: 'Lead engineer', department: 'Platform', location: 'London'},
        {name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer', department: 'Platform', location: 'Manchester'},
        {name: 'Grace Hopper', email: 'grace@example.com', role: 'Product designer', department: 'Design', location: 'New York'},
        {name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Engineering manager', department: 'Operations', location: 'Hampton'}
    ];
</script>
