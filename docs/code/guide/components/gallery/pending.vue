<template>
    <FluxPane :style="{ width: '50%' }">
        <FluxPaneBody>
            <FluxGallery
                :items="items"
                :pending-items="pendingItems"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxGallery, FluxPane, FluxPaneBody } from '@flux-ui/components';

    const items = [
        "/assets/demo/image-1.jpg",
        "/assets/demo/image-2.jpg",
        "/assets/demo/image-3.jpg",
        "/assets/demo/image-4.jpg"
    ];

    const pendingItems = [
        "/assets/demo/image-5.jpg",
    ];
</script>
