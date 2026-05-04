<template>
    <Preview>
        <FluxPane style="width: max-content; align-self: start">
            <FluxFilter
                v-model="filterState"
                :resettable="['notifications', 'darkMode']">
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
    </Preview>
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
