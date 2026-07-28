<template>
    <div style="position: relative;">
        <FluxSecondaryButton
            icon-trailing="angle-down"
            label="Actions"
            @click="isOpen = !isOpen"/>

        <FluxScaleTransition
            :from=".92"
            origin="top left">
            <FluxPane
                v-if="isOpen"
                style="position: absolute; top: calc(100% + 6px); left: 0; width: 240px; z-index: 1;">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="pen"
                            label="Rename"
                            @click="isOpen = false"/>

                        <FluxMenuItem
                            icon-leading="clone"
                            label="Duplicate"
                            @click="isOpen = false"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            label="Delete"
                            @click="isOpen = false"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>
        </FluxScaleTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxScaleTransition, FluxSecondaryButton, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const isOpen = ref(false);
</script>
