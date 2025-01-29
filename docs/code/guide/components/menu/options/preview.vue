<template>
    <Preview>
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
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane, FluxSeparator } from '@basmilius/flux';
    import { ref } from 'vue';

    const alignment = ref(0);
    const variant = ref(0);
</script>
