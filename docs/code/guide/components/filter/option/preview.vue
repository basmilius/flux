<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <FluxFilterOption
                    icon="clone"
                    label="Option"
                    name="option"
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
    import { FluxFilter, FluxFilterOption, FluxFilterState, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        option: 'a',

        get resettable(): string[] {
            return [];
        },

        reset(): void {
        }
    });
</script>
