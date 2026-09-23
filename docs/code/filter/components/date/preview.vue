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
    import { FluxPane } from '@flux-ui/components';
    import { FluxFilter, FluxFilterDate } from '@flux-ui/filter';
    import type { FluxFilterState } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref<FluxFilterState>({
        option: DateTime.now()
    });
</script>
