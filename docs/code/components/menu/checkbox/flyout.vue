<template>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="arrow-down-short-wide"
                    label="Sort"/>

                <FluxMenuFlyout
                    icon="filter"
                    label="Filter">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuCheckbox
                                v-for="state of states"
                                :key="state.label"
                                v-model="state.isEnabled"
                                :label="state.label"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="ban"
                                :is-persistent="false"
                                label="Clear filters"
                                @click="clear"/>
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
    import { FluxMenu, FluxMenuCheckbox, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@flux-ui/components';
    import { reactive } from 'vue';

    const states = reactive([
        {label: 'Draft', isEnabled: true},
        {label: 'In review', isEnabled: true},
        {label: 'Published', isEnabled: false},
        {label: 'Archived', isEnabled: false}
    ]);

    function clear(): void {
        for (const state of states) {
            state.isEnabled = false;
        }
    }
</script>
