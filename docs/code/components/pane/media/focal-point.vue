<template>
    <FluxPane style="max-width: 360px">
        <FluxPaneMedia
            image-url="/assets/demo/image-4.jpg"
            :aspect-ratio="21 / 9"
            :image-focal-point="[50, 20]"/>

        <FluxPaneHeader title="Focal point"/>

        <FluxPaneBody>
            <p>The focal point keeps the top of the image in frame on a wide, short crop.</p>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneMedia } from '@flux-ui/components';
</script>
