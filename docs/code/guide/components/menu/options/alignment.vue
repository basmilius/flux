<template>
    <FluxStack :gap="12">
        <FluxPane style="width: 270px">
            <FluxMenu>
                <FluxMenuOptions
                    v-model="alignment"
                    is-horizontal>
                    <FluxMenuItem icon-before="align-left"/>
                    <FluxMenuItem icon-before="align-center"/>
                    <FluxMenuItem icon-before="align-right"/>
                    <FluxMenuItem icon-before="align-justify"/>
                </FluxMenuOptions>
            </FluxMenu>
        </FluxPane>

        <small><kbd>Result = {{ ALIGNMENTS[alignment] }}</kbd></small>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane, FluxStack } from '@basmilius/flux';
    import { ref } from 'vue';

    const ALIGNMENTS = {
        0: 'left',
        1: 'center',
        2: 'right',
        3: 'justify'
    } as const;

    const alignment = ref<keyof typeof ALIGNMENTS>(0);
</script>
