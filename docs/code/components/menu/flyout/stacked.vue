<template>
    <div style="display: flex; flex-flow: column; gap: 15px">
        <div style="display: flex; align-items: center; gap: 9px">
            <FluxToggle
                v-model="showCone"/>

            Prediction cone
        </div>

        <FluxPane style="width: 320px">
            <FluxMenu :debug-cone="showCone">
                <FluxMenuGroup>
                    <FluxMenuFlyout
                        icon="align-left"
                        label="Align">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="align-left"
                                    label="Left"/>

                                <FluxMenuItem
                                    icon-leading="align-center"
                                    label="Center"/>

                                <FluxMenuItem
                                    icon-leading="align-right"
                                    label="Right"/>

                                <FluxMenuItem
                                    icon-leading="align-justify"
                                    label="Justify"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>

                    <FluxMenuFlyout
                        icon="list-ul"
                        label="List">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="list-ul"
                                    label="Bulleted"/>

                                <FluxMenuItem
                                    icon-leading="list-ol"
                                    label="Numbered"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>

                    <FluxMenuFlyout
                        icon="indent"
                        label="Indentation">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="indent"
                                    label="Increase"/>

                                <FluxMenuItem
                                    icon-leading="outdent"
                                    label="Decrease"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>

                    <FluxMenuFlyout
                        icon="image"
                        label="Insert">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="image"
                                    label="Image"/>

                                <FluxMenuItem
                                    icon-leading="play"
                                    label="Video"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const showCone = ref(false);
</script>
