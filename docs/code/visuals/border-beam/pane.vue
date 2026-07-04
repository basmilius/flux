<template>
    <FluxVisualBorderBeam>
        <FluxPane
            tag="New"
            style="max-width: 360px;">
            <FluxPaneHeader title="Manage even more"/>

            <FluxPaneBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet assumenda beatae commodi culpa fugit laboriosam nihil quasi quibusdam veniam! Cumque et fuga iste maxime officiis quas ratione repudiandae suscipit!
            </FluxPaneBody>

            <FluxPaneBody>
                <FluxSecondaryButton
                    icon-leading="gear"
                    label="Manage"/>
            </FluxPaneBody>
        </FluxPane>
    </FluxVisualBorderBeam>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualBorderBeam } from '@flux-ui/visuals';
</script>
