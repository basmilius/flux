<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuControl>
                <FluxFormInput
                    v-model="query"
                    type="search"
                    icon-leading="magnifying-glass"
                    placeholder="Filter actions..."/>
            </FluxMenuControl>

            <FluxMenuGroup>
                <FluxMenuItem
                    v-for="action of filtered"
                    :key="action.label"
                    :icon-leading="action.icon"
                    :label="action.label"/>

                <FluxMenuSubHeader
                    v-if="filtered.length === 0"
                    label="No matches"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormInput, FluxMenu, FluxMenuControl, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPane } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { computed, ref } from 'vue';

    const actions: { readonly icon: FluxIconName; readonly label: string; }[] = [
        {icon: 'scissors', label: 'Cut'},
        {icon: 'copy', label: 'Copy'},
        {icon: 'paste', label: 'Paste'},
        {icon: 'clone', label: 'Duplicate'},
        {icon: 'pen', label: 'Rename'},
        {icon: 'trash', label: 'Delete'}
    ];

    const query = ref('');

    const filtered = computed(() => actions.filter(action => action.label.toLowerCase().includes(query.value.toLowerCase())));
</script>
