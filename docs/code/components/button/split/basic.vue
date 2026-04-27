<template>
    <FluxSplitButton>
        <template #button>
            <FluxSecondaryButton
                label="Download"/>
        </template>

        <template #flyout>
            <FluxMenu>
                <FluxMenuItem
                    icon-leading="rectangle-sd"
                    label="Download in SD"/>
                <FluxMenuItem
                    icon-leading="rectangle-hd"
                    label="Download in HD"/>

                <FluxSeparator/>

                <FluxMenuItem
                    icon-leading="rectangle-4k"
                    label="Download in 4K"/>
            </FluxMenu>
        </template>
    </FluxSplitButton>
</template>

<script
    setup
    lang="ts">
    import { FluxMenu, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton } from '@flux-ui/components';
</script>
