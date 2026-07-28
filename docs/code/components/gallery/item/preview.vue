<template>
    <Preview>
        <FluxPane :style="{ width: '25%' }">
            <FluxPaneBody>
                <FluxGalleryItem
                    is-deletable
                    url="/assets/demo/image-1.jpg"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxGalleryItem, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
