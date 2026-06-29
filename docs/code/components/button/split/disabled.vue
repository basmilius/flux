<template>
    <FluxSplitButton
        disabled>
        <template #button>
            <FluxSecondaryButton
                disabled
                label="Download"/>
        </template>

        <template #flyout>
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="rectangle-sd"
                        label="Download in SD"/>

                    <FluxMenuItem
                        icon-leading="rectangle-hd"
                        label="Download in HD"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxSplitButton>
</template>

<script
    setup
    lang="ts">
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSplitButton } from '@flux-ui/components';
</script>
