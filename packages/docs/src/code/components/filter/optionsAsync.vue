<template>
    <FluxStack>
        <FluxPane style="width: 330px">
            <FluxFilter v-model="filterState">
                <FluxFilterOptionsAsync
                    icon="clone"
                    label="Options"
                    name="selected"
                    :fetch-options="fetchOptions"
                    :fetch-relevant="fetchRelevant"
                    :fetch-search="fetchSearch"/>
            </FluxFilter>
        </FluxPane>

        <pre>{{ filterState }}</pre>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterOptionsAsync, FluxFilterOptionRow, FluxPane, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import dataset from '../formSelect/dataset.json';

    const filterState = ref({
        selected: ['92f99357-7fe5-71eb-74e2-55e057607e16', '633c43e4-1a51-9c8c-c825-c8da9e347ee8'],

        get resettable() {
            return [];
        },

        reset(): void {
        }
    });

    async function fetchOptions(ids: string[]): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset
            .filter(o => ids.includes(o.id))
            .map(o => ({
                label: o.label,
                value: o.id
            }));
    }

    async function fetchRelevant(): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset
            .map(o => ({
                label: o.label,
                value: o.id
            }))
            .toSorted();
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset
            .filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(o => ({
                label: o.label,
                value: o.id
            }));
    }
</script>
