<template>
    <FluxFlex :gap="9">
        <FluxPane style="width: 240px">
            <FluxPaneMedia
                image-url="/assets/demo/image-2.jpg"
                :aspect-ratio="16 / 9"/>

            <FluxPaneHeader title="16 : 9"/>
        </FluxPane>

        <FluxPane style="width: 240px">
            <FluxPaneMedia
                image-url="/assets/demo/image-3.jpg"
                :aspect-ratio="1"/>

            <FluxPaneHeader title="1 : 1"/>
        </FluxPane>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxPaneHeader, FluxPaneMedia } from '@flux-ui/components';
</script>
