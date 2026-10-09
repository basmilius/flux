<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxFilter v-model="filterState">
                <MyTextFilter
                    icon="magnifying-glass"
                    label="Name"
                    name="name"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxPane } from '@flux-ui/components';
    import type { FluxFilterState } from '@flux-ui/types';
    import { ref } from 'vue';
    import MyTextFilter from './MyTextFilter.vue';

    const filterState = ref<FluxFilterState>({});
</script>
