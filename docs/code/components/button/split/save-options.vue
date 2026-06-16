<template>
    <FluxSplitButton>
        <template #button>
            <FluxSecondaryButton
                icon-leading="floppy-disk"
                label="Save"/>
        </template>

        <template #flyout="{close}">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="floppy-disk"
                        label="Save"
                        command="⌘S"
                        @click="close()"/>

                    <FluxMenuItem
                        icon-leading="copy"
                        label="Save as draft"
                        @click="close()"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="paper-plane"
                        label="Save and publish"
                        @click="close()"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxSplitButton>
</template>

<script
    setup
    lang="ts">
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton } from '@flux-ui/components';
</script>
