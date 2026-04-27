<template>
    <FluxStack :gap="12">
        <FluxPane style="width: 270px">
            <FluxMenu>
                <FluxMenuOptions
                    v-model="view"
                    mode="select">
                    <FluxMenuItem
                        icon-leading="list"
                        label="List"/>

                    <FluxMenuItem
                        icon-leading="grid-2"
                        label="Grid"/>
                </FluxMenuOptions>
            </FluxMenu>
        </FluxPane>

        <small><kbd>Result = {{ VIEWS[view] }}</kbd></small>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane, FluxStack } from '@flux-ui/components';
    import { ref } from 'vue';

    const VIEWS = {
        0: 'list',
        1: 'grid'
    } as const;

    const view = ref<keyof typeof VIEWS>(0);
</script>
