<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="plus"
                    label="New file"/>

                <FluxMenuFlyout
                    icon="filter"
                    label="Actions">
                    <FluxMenu>
                        <FluxMenuPane>
                            <FluxFormInput
                                v-model="query"
                                type="search"
                                icon-leading="magnifying-glass"
                                placeholder="Filter actions..."/>
                        </FluxMenuPane>

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
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { FluxFormInput, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxMenuSubHeader, FluxPane } from '@flux-ui/components';
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
