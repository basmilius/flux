<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader
                    is-sortable
                    data-type="text"
                    :sort="column === 'name' ? direction : undefined"
                    @sort="setSort('name', $event)">
                    Name
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-sortable
                    data-type="numeric"
                    :sort="column === 'commits' ? direction : undefined"
                    @sort="setSort('commits', $event)">
                    Commits
                </FluxTableHeader>

                <FluxTableHeader
                    is-sortable
                    data-type="date"
                    :sort="column === 'joined' ? direction : undefined"
                    @sort="setSort('joined', $event)">
                    Joined
                </FluxTableHeader>
            </template>

            <FluxTableRow>
                <FluxTableCell>Ada Lovelace</FluxTableCell>
                <FluxTableCell align="end">1,287</FluxTableCell>
                <FluxTableCell>2021-04-08</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { ref } from 'vue';

    type SortDirection = 'ascending' | 'descending';

    const column = ref<'name' | 'commits' | 'joined'>('name');
    const direction = ref<SortDirection>('ascending');

    function setSort(next: 'name' | 'commits' | 'joined', value: SortDirection | null): void {
        if (value === null) {
            return;
        }

        column.value = next;
        direction.value = value;
    }
</script>
