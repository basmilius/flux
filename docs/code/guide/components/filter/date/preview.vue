<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <FluxFilterDate
                    icon="calendar"
                    label="Date"
                    name="option"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxFilterState, FluxPane } from '@basmilius/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        option: DateTime.now(),

        get resettable(): string[] {
            return [];
        },

        reset(): void {
        }
    });
</script>
