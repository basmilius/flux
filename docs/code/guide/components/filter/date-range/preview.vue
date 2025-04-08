<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <FluxFilterDateRange
                    icon="calendar"
                    label="Date range"
                    name="option"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDateRange, FluxFilterState, FluxPane } from '@flux-ui/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        option: [
            DateTime.now().startOf('week'),
            DateTime.now().endOf('week')
        ],

        get resettable(): string[] {
            return [];
        },

        reset(): void {
        }
    });
</script>
