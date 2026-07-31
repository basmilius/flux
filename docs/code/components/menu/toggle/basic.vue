<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuSubHeader label="Notifications"/>

                <FluxMenuGroup>
                    <FluxMenuToggle
                        v-model="email"
                        icon-leading="envelope"
                        label="Email"/>

                    <FluxMenuToggle
                        v-model="push"
                        icon-leading="bell"
                        label="Push"/>

                    <FluxMenuToggle
                        v-model="sound"
                        icon-leading="bolt"
                        label="Sound"
                        :disabled="!push"/>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuSubHeader, FluxMenuToggle, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const email = ref(true);
    const push = ref(true);
    const sound = ref(false);
</script>
