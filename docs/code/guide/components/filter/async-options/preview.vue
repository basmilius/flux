<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <FluxFilterOptionsAsync
                    :fetch-options="fetchOptions"
                    :fetch-relevant="fetchRelevant"
                    :fetch-search="fetchSearch"
                    icon="clone"
                    label="Options"
                    name="options"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterOptionRow, FluxFilterOptionsAsync, FluxFilterState, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';
    import dataset from '../../../../../assets/select-dataset.json' with { type: 'json' };

    const filterState = ref<FluxFilterState>({
        options: ['73c83353-de92-8110-9bce-c2a9e8c0de64', '92f99357-7fe5-71eb-74e2-55e057607e16'],

        get resettable(): string[] {
            return [];
        },

        reset(): void {
        }
    });

    async function fetchOptions(values: string[]): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset.filter(o => values.includes(o.value));
    }

    async function fetchRelevant(): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset.toSorted();
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
</script>
