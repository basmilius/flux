<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <FluxFilterOptions
                    icon="clone"
                    label="Options"
                    name="options"
                    :options="[
                        {label: 'Option A', value: 'a'},
                        {label: 'Option B', value: 'b'},
                        {label: 'Option C', value: 'c'},
                        {label: 'Option D', value: 'd'},
                        {label: 'Option E', value: 'e'}
                    ]"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterOptions, FluxPane } from '@flux-ui/components';
    import type { FluxFilterState } from '@flux-ui/types';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        options: ['b', 'd'],

        get resettable(): string[] {
            return [];
        },

        reset(): void {
        }
    });
</script>
