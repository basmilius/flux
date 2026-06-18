<template>
    <Preview>
        <FluxPane style="width: 270px">
            <FluxMenu>
                <FluxMenuOptions
                    v-model="density"
                    mode="select">
                    <FluxMenuItem
                        icon-leading="bars"
                        label="Comfortable"/>

                    <FluxMenuItem
                        icon-leading="list"
                        label="Compact"/>
                </FluxMenuOptions>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="pen"
                        label="Rename"/>

                    <FluxMenuFlyout
                        icon="arrow-up-from-square"
                        label="Share">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="paper-plane"
                                    label="Email"/>

                                <FluxMenuItem
                                    icon-leading="copy"
                                    label="Copy link"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuOptions, FluxPane, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const density = ref(0);
</script>
