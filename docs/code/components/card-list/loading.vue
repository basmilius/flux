<template>
    <FluxPane>
        <FluxCardList columns="minmax(0, 2fr) minmax(0, 1fr)">
            <FluxCardListItem
                v-for="item of ITEMS"
                :key="item.id"
                v-model:expanded="expanded[item.id]"
                :is-expand-loading="expanded[item.id] && !loaded[item.id]"
                @intent="load(item.id)"
                @update:expanded="value => value && load(item.id)">
                <FluxText :weight="500">{{ item.name }}</FluxText>
                <FluxText color="muted">Hover or open to load</FluxText>

                <template #expandable>
                    <FluxText>Loaded details of {{ item.name }}.</FluxText>
                </template>
            </FluxCardListItem>
        </FluxCardList>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxCardList, FluxCardListItem, FluxPane, FluxText } from '@flux-ui/components';
    import { reactive } from 'vue';

    const ITEMS = [
        {id: 1, name: 'Anna de Vries'},
        {id: 2, name: 'Jan Jansen'},
        {id: 3, name: 'Sanne Bakker'}
    ];

    const expanded = reactive<Record<number, boolean>>({});
    const loaded = reactive<Record<number, boolean>>({});

    function load(id: number): void {
        if (loaded[id]) {
            return;
        }

        setTimeout(() => loaded[id] = true, 800);
    }
</script>
