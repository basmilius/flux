<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormSelectAsync
                v-model="selectedValue"
                :fetch-options="fetchOptions"
                :fetch-relevant="fetchRelevant"
                :fetch-search="fetchSearch"
                is-multiple
                placeholder="Select an option..."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormSelectAsync, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { FluxFormSelectEntry } from '@flux-ui/types';
    import { ref } from 'vue';
    import dataset from '../../../../../assets/select-dataset.json' with { type: 'json' };

    const selectedValue = ref([]);

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
