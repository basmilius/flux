<template>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuSubHeader label="Theme"/>

            <FluxMenuOptions
                v-model="theme"
                mode="select">
                <FluxMenuItem
                    key="system"
                    label="Follow your system"/>

                <FluxMenuItem
                    key="light"
                    label="Light"/>

                <FluxMenuItem
                    key="dark"
                    label="Dark"/>
            </FluxMenuOptions>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxMenuSubHeader, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const theme = ref('system');
</script>
