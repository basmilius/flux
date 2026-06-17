<template>
    <FluxFlex
        direction="vertical"
        :gap="12">
        <FluxFlyout>
            <template #opener="{ open }">
                <FluxSecondaryButton
                    icon-trailing="angle-down"
                    :label="`View: ${VIEWS[view]}`"
                    @click="open()"/>
            </template>

            <FluxMenu style="width: 200px">
                <FluxMenuOptions
                    v-model="view"
                    mode="select">
                    <FluxMenuItem
                        icon-leading="list"
                        label="List"/>

                    <FluxMenuItem
                        icon-leading="grid-2"
                        label="Grid"/>

                    <FluxMenuItem
                        icon-leading="image"
                        label="Gallery"/>
                </FluxMenuOptions>
            </FluxMenu>
        </FluxFlyout>

        <small><kbd>Selecting an option keeps the menu open</kbd></small>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxFlyout, FluxMenu, FluxMenuItem, FluxMenuOptions, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const VIEWS = ['List', 'Grid', 'Gallery'];

    const view = ref(0);
</script>
