<template>
    <FluxFormSelectAsync
        v-model="selectValue"
        :fetch-options="fetchOptions"
        :fetch-relevant="fetchRelevant"
        :fetch-search="fetchSearch"
        is-multiple
        placeholder="Pick an option..."/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSelectAsync, FluxFormSelectEntry } from '@basmilius/flux';
    import { ref } from 'vue';
    import dataset from '../formSelect/dataset.json';

    const selectValue = ref([]);

    async function fetchOptions(values: string[]): Promise<FluxFormSelectEntry[]> {
        return dataset.filter(o => values.includes(o.value));
    }

    async function fetchRelevant(): Promise<FluxFormSelectEntry[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return dataset.toSorted();
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFormSelectEntry[]> {
        return dataset.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
</script>
