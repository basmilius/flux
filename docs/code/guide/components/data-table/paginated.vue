<template>
    <FluxPane>
        <FluxDataTable
            :data-set="visibleDataSet"
            :total="dataSet.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
            </template>

            <template #name="{row: {name}}">
                <FluxTableCell>{{ name }}</FluxTableCell>
            </template>
        </FluxDataTable>

        <FluxPaneFooter>
            <FluxPaginationBar
                :limits="[5, 10, 25, 50, 100]"
                :page="page"
                :per-page="perPage"
                :total="dataSet.length"
                @limit="limit => perPage = limit"
                @navigate="p => page = p"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxDataTable, FluxPaginationBar, FluxPane, FluxPaneFooter, FluxTableCell, FluxTableHeader } from '@flux-ui/flux';
    import { computed, ref, unref } from 'vue';

    const page = ref(1);
    const perPage = ref(10);

    const dataSet = computed(() => Array(500)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: `Item ${index + 1}`
        })));

    const visibleDataSet = computed(() => unref(dataSet).slice((unref(page) - 1) * unref(perPage), unref(page) * unref(perPage)));
</script>
