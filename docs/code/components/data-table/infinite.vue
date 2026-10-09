<template>
    <FluxPane>
        <FluxDataTable
            :has-more="items.length < TOTAL"
            :is-loading-more="isLoadingMore"
            :items="items"
            pagination="infinite"
            is-hoverable
            is-sticky
            style="max-height: 320px"
            @load-more="loadMore">
            <template #header>
                <FluxTableHeader is-shrinking>#</FluxTableHeader>
                <FluxTableHeader>Name</FluxTableHeader>
            </template>

            <template #id="{item}">
                <FluxTableCell no-wrap>{{ item.id }}</FluxTableCell>
            </template>

            <template #name="{item}">
                <FluxTableCell>{{ item.name }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { ref } from 'vue';

    const TOTAL = 60;
    const PAGE_SIZE = 15;

    const items = ref(createPage(0));
    const isLoadingMore = ref(false);

    function createPage(offset: number): { id: number; name: string; }[] {
        return Array.from({length: PAGE_SIZE}, (_, index) => ({id: offset + index + 1, name: `Candidate ${offset + index + 1}`}));
    }

    function loadMore(): void {
        isLoadingMore.value = true;

        setTimeout(() => {
            items.value = [...items.value, ...createPage(items.value.length)];
            isLoadingMore.value = false;
        }, 600);
    }
</script>
