<template>
    <Preview>
        <FluxPane style="max-width: 360px">
            <FluxPaneMedia
                image-url="/assets/demo/image-2.jpg"
                is-inset/>

            <FluxPaneHeader title="Starry stones"/>

            <FluxPaneBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneMedia } from '@flux-ui/components';
</script>
