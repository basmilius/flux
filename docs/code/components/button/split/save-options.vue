<template>
    <FluxSplitButton>
        <template #button>
            <FluxSecondaryButton
                icon-leading="floppy-disk"
                label="Save"/>
        </template>

        <template #flyout="{close}">
            <FluxMenu>
                <FluxMenuItem
                    icon-leading="floppy-disk"
                    label="Save"
                    command="⌘S"
                    @click="close()"/>

                <FluxMenuItem
                    icon-leading="copy"
                    label="Save as draft"
                    @click="close()"/>

                <FluxSeparator/>

                <FluxMenuItem
                    icon-leading="paper-plane"
                    label="Save and publish"
                    @click="close()"/>
            </FluxMenu>
        </template>
    </FluxSplitButton>
</template>

<script
    setup
    lang="ts">
    import { FluxMenu, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton } from '@flux-ui/components';
</script>
