<template>
    <FluxPane :style="{ width: '25%' }">
        <FluxPaneBody>
            <FluxGalleryItem
                is-pending
                url="/assets/demo/image-1.jpg"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxGalleryItem, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
