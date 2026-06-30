<template>
    <FluxPane>
        <FluxDataTable
            :items="sortedItems"
            :limits="[]"
            :page="1"
            :per-page="people.length"
            :total="people.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader
                    is-sortable
                    :sort="sortColumn === 'name' ? sortDirection : undefined"
                    @sort="setSort('name', $event)">
                    Name
                </FluxTableHeader>

                <FluxTableHeader
                    is-sortable
                    :sort="sortColumn === 'role' ? sortDirection : undefined"
                    @sort="setSort('role', $event)">
                    Role
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-sortable
                    :sort="sortColumn === 'commits' ? sortDirection : undefined"
                    @sort="setSort('commits', $event)">
                    Commits
                </FluxTableHeader>
            </template>

            <template #name="{item}">
                <FluxTableCell>
                    <strong>{{ item.name }}</strong>
                </FluxTableCell>
            </template>

            <template #role="{item}">
                <FluxTableCell>{{ item.role }}</FluxTableCell>
            </template>

            <template #commits="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.commits.toLocaleString() }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    type SortDirection = 'ascending' | 'descending';

    type Person = {
        readonly id: number;
        readonly name: string;
        readonly role: string;
        readonly commits: number;
    };

    const people: Person[] = [
        {id: 1, name: 'Ada Lovelace', role: 'Lead', commits: 1287},
        {id: 2, name: 'Alan Turing', role: 'Engineer', commits: 942},
        {id: 3, name: 'Grace Hopper', role: 'Engineer', commits: 1530},
        {id: 4, name: 'Katherine Johnson', role: 'Manager', commits: 318},
        {id: 5, name: 'Margaret Hamilton', role: 'Engineer', commits: 2041}
    ];

    const sortColumn = ref<keyof Person | null>('commits');
    const sortDirection = ref<SortDirection>('descending');

    const sortedItems = computed(() => {
        const column = sortColumn.value;

        if (!column) {
            return people;
        }

        const factor = sortDirection.value === 'ascending' ? 1 : -1;

        return [...people].sort((a, b) => {
            const left = a[column];
            const right = b[column];

            if (typeof left === 'number' && typeof right === 'number') {
                return (left - right) * factor;
            }

            return String(left).localeCompare(String(right)) * factor;
        });
    });

    function setSort(column: keyof Person, direction: SortDirection | null): void {
        if (direction === null) {
            sortColumn.value = null;
            return;
        }

        sortColumn.value = column;
        sortDirection.value = direction;
    }
</script>
