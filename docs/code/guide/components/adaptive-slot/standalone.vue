<template>
    <Preview>
        <FluxPane style="width: min(100%, 360px); resize: horizontal; overflow: auto">
            <FluxPaneBody>
                <FluxRow :gap="9">
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
                </FluxRow>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAdaptiveSlot, FluxPane, FluxPaneBody, FluxRow, FluxSecondaryButton } from '@flux-ui/components';
</script>
