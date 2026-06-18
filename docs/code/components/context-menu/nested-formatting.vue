<template>
    <div style="display: flex; flex-flow: column; gap: 15px">
        <div style="display: flex; align-items: center; gap: 9px">
            <FluxToggle
                v-model="showCone"/>

            Prediction cone
        </div>

        <FluxContextMenu :debug-cone="showCone">
            <FluxPane style="padding: 36px; text-align: center">
                Right-click this cell
            </FluxPane>

            <template #menu="{close}">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="scissors"
                            label="Cut"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="copy"
                            label="Copy"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="paste"
                            label="Paste"
                            type="button"
                            @click="close"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuFlyout
                            icon="plus"
                            label="Insert">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="arrow-up"
                                        label="Row above"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="arrow-down"
                                        label="Row below"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>

                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuFlyout
                                        icon="table-cells"
                                        label="Cells">
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    icon-leading="arrow-right"
                                                    label="Shift right"
                                                    type="button"
                                                    @click="close"/>

                                                <FluxMenuItem
                                                    icon-leading="arrow-down"
                                                    label="Shift down"
                                                    type="button"
                                                    @click="close"/>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>

                        <FluxMenuFlyout
                            icon="font"
                            label="Format">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuFlyout
                                        icon="hashtag"
                                        label="Number">
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    label="Currency"
                                                    type="button"
                                                    @click="close"/>

                                                <FluxMenuItem
                                                    label="Percent"
                                                    type="button"
                                                    @click="close"/>

                                                <FluxMenuItem
                                                    label="Date"
                                                    type="button"
                                                    @click="close"/>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>

                                    <FluxMenuFlyout
                                        icon="text-height"
                                        label="Text">
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    icon-leading="bold"
                                                    label="Bold"
                                                    type="button"
                                                    @click="close"/>

                                                <FluxMenuItem
                                                    icon-leading="italic"
                                                    label="Italic"
                                                    type="button"
                                                    @click="close"/>
                                            </FluxMenuGroup>

                                            <FluxSeparator/>

                                            <FluxMenuGroup>
                                                <FluxMenuFlyout
                                                    icon="palette"
                                                    label="Color">
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuItem
                                                                icon-leading="circle"
                                                                label="Red"
                                                                type="button"
                                                                @click="close"/>

                                                            <FluxMenuItem
                                                                icon-leading="circle"
                                                                label="Green"
                                                                type="button"
                                                                @click="close"/>

                                                            <FluxMenuItem
                                                                icon-leading="circle"
                                                                label="Blue"
                                                                type="button"
                                                                @click="close"/>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete row"
                            type="button"
                            @click="close"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxContextMenu>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const showCone = ref(false);
</script>
