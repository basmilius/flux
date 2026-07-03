<template>
    <FluxPane style="width: max-content; align-self: start">
        <FluxFilter
            v-model="filterState">
            <MyToggleFilter
                icon="bell"
                label="Notifications"
                name="notifications"
                :default-value="true"/>

            <MyToggleFilter
                icon="moon"
                label="Dark mode"
                name="darkMode"/>
        </FluxFilter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxPane } from '@flux-ui/components';
    import type { FluxFilterState } from '@flux-ui/types';
    import { ref } from 'vue';
    import MyToggleFilter from './MyToggleFilter.vue';

    const filterState = ref<FluxFilterState>({});
</script>
