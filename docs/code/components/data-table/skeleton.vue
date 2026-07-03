<template>
    <FluxPane>
        <FluxPaneHeader title="Members">
            <template #after>
                <FluxSecondaryButton
                    :disabled="isLoading"
                    icon-leading="rotate"
                    label="Refresh"
                    @click="refresh"/>
            </template>
        </FluxPaneHeader>

        <FluxDataTable
            :is-loading="isLoading"
            :items="people"
            :limits="[]"
            :page="1"
            :per-page="4"
            :total="people.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader>Role</FluxTableHeader>
                <FluxTableHeader is-shrinking>Commits</FluxTableHeader>
            </template>

            <template #loading="{perPage}">
                <FluxTableRow
                    v-for="row in perPage"
                    :key="row">
                    <FluxTableCell
                        v-for="cell in 3"
                        :key="cell">
                        <FluxSkeleton/>
                    </FluxTableCell>
                </FluxTableRow>
            </template>

            <template #name="{item}">
                <FluxTableCell>{{ item.name }}</FluxTableCell>
            </template>

            <template #role="{item}">
                <FluxTableCell>{{ item.role }}</FluxTableCell>
            </template>

            <template #commits="{item}">
                <FluxTableCell is-numeric>{{ item.commits }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxPaneHeader, FluxSecondaryButton, FluxSkeleton, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { ref } from 'vue';

    const isLoading = ref(false);

    const people = [
        {id: 1, name: 'Ada Lovelace', role: 'Lead', commits: 1287},
        {id: 2, name: 'Alan Turing', role: 'Engineer', commits: 942},
        {id: 3, name: 'Grace Hopper', role: 'Engineer', commits: 1530},
        {id: 4, name: 'Margaret Hamilton', role: 'Engineer', commits: 2041}
    ];

    function refresh(): void {
        isLoading.value = true;
        setTimeout(() => isLoading.value = false, 2000);
    }
</script>
