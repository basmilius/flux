<template>
    <Preview>
        <FluxPane style="width: min(100%, 520px); resize: horizontal; overflow: auto">
            <FluxPaneBody>
                <FluxAdaptiveGroup :gap="9">
                    <FluxAdaptiveSlot :priority="2">
                        <FluxSecondaryButton
                            icon-leading="pen"
                            label="Edit"/>

                        <template #fallback>
                            <FluxSecondaryButton icon-leading="pen"/>
                        </template>
                    </FluxAdaptiveSlot>

                    <FluxAdaptiveSlot :priority="3">
                        <FluxSecondaryButton
                            icon-leading="copy"
                            label="Duplicate"/>

                        <template #fallback>
                            <FluxSecondaryButton icon-leading="copy"/>
                        </template>
                    </FluxAdaptiveSlot>

                    <FluxAdaptiveSlot :priority="1">
                        <FluxSecondaryButton
                            icon-leading="trash"
                            label="Delete"/>

                        <template #fallback>
                            <FluxSecondaryButton icon-leading="trash"/>
                        </template>
                    </FluxAdaptiveSlot>

                    <FluxAdaptiveSlot :priority="4">
                        <FluxPrimaryButton
                            icon-leading="circle-check"
                            label="Approve"/>

                        <template #fallback>
                            <FluxPrimaryButton icon-leading="circle-check"/>
                        </template>
                    </FluxAdaptiveSlot>
                </FluxAdaptiveGroup>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAdaptiveGroup, FluxAdaptiveSlot, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
