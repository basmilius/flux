<template>
    <FluxPane style="max-width: 360px">
        <FluxPaneMedia
            image-url="/assets/demo/image-2.jpg"/>

        <FluxPaneHeader title="Starry stones"/>

        <FluxPaneBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneMedia } from '@flux-ui/components';
</script>
