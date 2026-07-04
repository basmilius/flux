<template>
    <FluxVisualBorderBeam variant="pulse-inner">
        <FluxPane style="width: 280px;">
            <FluxPaneHeader title="Pulse inner"/>

            <FluxPaneBody>
                A breathing glow that stays contained within the element.
            </FluxPaneBody>
        </FluxPane>
    </FluxVisualBorderBeam>

    <FluxVisualBorderBeam variant="pulse-outside">
        <FluxPane style="width: 280px;">
            <FluxPaneHeader title="Pulse outside"/>

            <FluxPaneBody>
                A breathing halo that blooms outward, behind the element.
            </FluxPaneBody>
        </FluxPane>
    </FluxVisualBorderBeam>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';
    import { FluxVisualBorderBeam } from '@flux-ui/visuals';
</script>
