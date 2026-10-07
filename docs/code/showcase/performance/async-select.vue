<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxFormField label="Single selection">
                <FluxFormSelectAsync
                    v-model="single"
                    :fetch-options="fetchOptions"
                    :fetch-relevant="fetchRelevant"
                    :fetch-search="fetchSearch"/>
            </FluxFormField>

            <FluxFormField label="Multiple selections">
                <FluxFormSelectAsync
                    v-model="multiple"
                    :fetch-options="fetchOptions"
                    :fetch-relevant="fetchRelevant"
                    :fetch-search="fetchSearch"
                    is-multiple/>
            </FluxFormField>

            <p>Selected values: {{ single }} / {{ multiple.join(', ') || 'none' }}</p>
        </FluxPaneBody>
    </FluxPane>
</template>

<script lang="ts" setup>
    import { FluxFormField, FluxFormSelectAsync, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import type { FluxFormSelectEntry, FluxFormSelectValueSingle } from '@flux-ui/types';
    import { ref } from 'vue';

    const OPTIONS = [
        {value: 1, label: 'Alice'},
        {value: 2, label: 'Bob'},
        {value: 3, label: 'Charlie'}
    ];

    const single = ref(1);
    const multiple = ref([1]);

    async function fetchOptions(values: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]> {
        return OPTIONS.filter(option => values.includes(option.value));
    }

    async function fetchRelevant(): Promise<FluxFormSelectEntry[]> {
        return OPTIONS;
    }

    async function fetchSearch(query: string): Promise<FluxFormSelectEntry[]> {
        await new Promise(resolve => setTimeout(resolve, 450));

        const search = query.toLowerCase();
        return OPTIONS.filter(option => option.label.toLowerCase().includes(search)
            || (search === 'robert' && option.value === 2));
    }
</script>
