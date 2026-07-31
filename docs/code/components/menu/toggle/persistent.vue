<template>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuFlyout
                    icon="eye"
                    label="Visibility">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuToggle
                                v-model="sidebar"
                                icon-leading="sidebar"
                                label="Sidebar"/>

                            <FluxMenuToggle
                                v-model="preview"
                                icon-leading="eye"
                                label="Preview"/>

                            <FluxMenuToggle
                                v-model="focusMode"
                                icon-leading="expand"
                                :is-persistent="false"
                                label="Focus mode"/>
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
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuToggle, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const sidebar = ref(true);
    const preview = ref(true);
    const focusMode = ref(false);
</script>
