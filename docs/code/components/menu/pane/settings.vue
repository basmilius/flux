<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="user"
                    label="Account"/>

                <FluxMenuFlyout
                    icon="bell"
                    label="Notifications">
                    <FluxMenu>
                        <FluxMenuPane>
                            <label style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
                                Email
                                <FluxToggle v-model="email"/>
                            </label>

                            <label style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
                                Push
                                <FluxToggle v-model="push"/>
                            </label>
                        </FluxMenuPane>
                    </FluxMenu>
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxPane, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const email = ref(true);
    const push = ref(false);
</script>
