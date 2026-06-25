<template>
    <FluxFlex
        direction="vertical"
        :gap="12">
        <FluxPane style="width: 270px">
            <FluxMenu>
                <FluxMenuOptions
                    v-model="view"
                    mode="select">
                    <FluxMenuItem
                        key="list"
                        icon-leading="list"
                        label="List"/>

                    <FluxMenuItem
                        key="grid"
                        icon-leading="grid-2"
                        label="Grid"/>
                </FluxMenuOptions>
            </FluxMenu>
        </FluxPane>

        <small><kbd>Result = {{ view }}</kbd></small>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref<'list' | 'grid'>('list');
</script>
