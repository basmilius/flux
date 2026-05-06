<template>
    <Preview>
        <FluxPane style="width: min(100%, 360px); resize: horizontal; overflow: auto">
            <FluxPaneBody>
                <FluxFlex :gap="9">
                    <FluxAdaptiveSlot>
                        <FluxSecondaryButton
                            icon-leading="magnifying-glass"
                            label="Search"/>

                        <template #fallback>
                            <FluxSecondaryButton icon-leading="magnifying-glass"/>
                        </template>
                    </FluxAdaptiveSlot>

                    <FluxAdaptiveSlot>
                        <FluxSecondaryButton
                            icon-leading="filter"
                            label="Filter"/>

                        <template #fallback>
                            <FluxSecondaryButton icon-leading="filter"/>
                        </template>
                    </FluxAdaptiveSlot>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAdaptiveSlot, FluxFlex, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
</script>
