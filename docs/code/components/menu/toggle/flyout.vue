<template>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="user"
                    label="Account"/>

                <FluxMenuFlyout
                    icon="bell"
                    label="Notifications">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuToggle
                                v-model="email"
                                icon-leading="envelope"
                                label="Email"/>

                            <FluxMenuToggle
                                v-model="push"
                                icon-leading="bell"
                                label="Push"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuToggle, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const email = ref(true);
    const push = ref(false);
</script>
