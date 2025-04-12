<template>
    <Preview>
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

                <FluxSeparator/>

                <FluxMenuOptions
                    v-model="variant"
                    mode="select">
                    <FluxMenuItem
                        v-for="i of 5"
                        :label="`Menu item ${i}`"/>
                </FluxMenuOptions>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const alignment = ref(0);
    const variant = ref(0);
</script>
