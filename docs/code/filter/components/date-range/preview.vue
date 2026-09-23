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
    import { FluxPane } from '@flux-ui/components';
    import { FluxFilter, FluxFilterDateRange } from '@flux-ui/filter';
    import type { FluxFilterState } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        option: [
            DateTime.now().startOf('week'),
            DateTime.now().endOf('week')
        ]
    });
</script>
