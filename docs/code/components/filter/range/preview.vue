<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <FluxFilterRange
                    icon="clone"
                    label="Range"
                    name="option"
                    :max="1000"
                    :min="100"
                    :step="10"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterRange, FluxPane } from '@flux-ui/components';
    import type { FluxFilterState } from '@flux-ui/types';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        option: [500, 750],

        get resettable(): string[] {
            return [];
        },

        reset(): void {
        }
    });
</script>
