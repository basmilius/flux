<template>
    <FluxStack :gap="12">
        <FluxPane style="width: 270px">
            <FluxMenu>
                <FluxMenuOptions
                    v-model="alignment"
                    is-horizontal>
                    <FluxMenuItem icon-leading="align-left"/>
                    <FluxMenuItem icon-leading="align-center"/>
                    <FluxMenuItem icon-leading="align-right"/>
                    <FluxMenuItem icon-leading="align-justify"/>
                </FluxMenuOptions>
            </FluxMenu>
        </FluxPane>

        <small><kbd>Result = {{ ALIGNMENTS[alignment] }}</kbd></small>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane, FluxStack } from '@flux-ui/components';
    import { ref } from 'vue';

    const ALIGNMENTS = {
        0: 'left',
        1: 'center',
        2: 'right',
        3: 'justify'
    } as const;

    const alignment = ref<keyof typeof ALIGNMENTS>(0);
</script>
