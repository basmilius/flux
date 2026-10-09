<template>
    <FluxPane>
        <FluxCardList
            columns="48px minmax(0, 1fr)"
            style="max-height: 320px; overflow: auto"
            :has-more="items.length < TOTAL"
            :is-loading-more="isLoadingMore"
            @load-more="loadMore">
            <FluxCardListItem
                v-for="item of items"
                :key="item.id">
                <FluxText color="muted">{{ item.id }}</FluxText>
                <FluxText :weight="500">Candidate {{ item.id }}</FluxText>
            </FluxCardListItem>
        </FluxCardList>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxCardList, FluxCardListItem, FluxPane, FluxText } from '@flux-ui/components';
    import { ref } from 'vue';

    const TOTAL = 60;
    const PAGE_SIZE = 15;

    const items = ref(createPage(0));
    const isLoadingMore = ref(false);

    function createPage(offset: number): { id: number; }[] {
        return Array.from({length: PAGE_SIZE}, (_, index) => ({id: offset + index + 1}));
    }

    function loadMore(): void {
        isLoadingMore.value = true;

        setTimeout(() => {
            items.value = [...items.value, ...createPage(items.value.length)];
            isLoadingMore.value = false;
        }, 600);
    }
</script>
