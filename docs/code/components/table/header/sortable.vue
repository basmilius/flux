<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader
                    :sort="sort"
                    v-for="header in 3"
                    :is-sortable="header === 2"
                    @sort="updateSorting">
                    Header {{ header }}
                </FluxTableHeader>
            </template>

            <FluxTableRow>
                <FluxTableCell
                    v-for="cell in 3">
                    Cell 1&times;{{ cell }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { ref } from 'vue';

    const sort = ref<'ascending' | 'descending'>("ascending");

    function updateSorting(sorting: 'ascending' | 'descending' | null): void {
        sort.value = sorting ?? "ascending";
    }
</script>
