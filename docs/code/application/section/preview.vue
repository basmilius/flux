<template>
    <Preview>
        <FluxApplicationSection
            title="Recent projects"
            info="3 active">
            <template #end>
                <FluxSecondaryButton
                    label="View all"/>
            </template>

            <FluxPane>
                <FluxPaneBody>
                    Project content goes here.
                </FluxPaneBody>
            </FluxPane>
        </FluxApplicationSection>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationSection } from '@flux-ui/application';
    import { FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
</script>
