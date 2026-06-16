<template>
    <Preview>
        <FluxSplitButton>
            <template #button>
                <FluxSecondaryButton
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

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="rectangle-4k"
                            label="Download in 4K"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxSplitButton>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton } from '@flux-ui/components';
</script>
