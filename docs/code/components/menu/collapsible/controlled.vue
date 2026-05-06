<template>
    <FluxFlex
        direction="vertical"
        :gap="18">
        <FluxButtonStack align="center">
            <FluxSecondaryButton
                label="Toggle"
                @click="isOpened = !isOpened"/>
        </FluxButtonStack>

        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuCollapsible
                    v-model:is-opened="isOpened"
                    icon-leading="cubes"
                    label="Projects">
                    <FluxMenuItem label="Active"/>

                    <FluxMenuItem label="Archived"/>
                </FluxMenuCollapsible>
            </FluxMenu>
        </FluxPane>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlex, FluxMenu, FluxMenuCollapsible, FluxMenuItem, FluxPane, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isOpened = ref(true);
</script>
