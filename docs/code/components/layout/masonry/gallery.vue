<template>
    <FluxMasonry :columns="{xs: 1, sm: 2, md: 3}">
        <FluxAspectRatio
            v-for="photo of photos"
            :key="photo.url"
            :aspect-ratio="photo.aspectRatio"
            class="photo">
            <img
                :alt="photo.alt"
                :src="photo.url">
        </FluxAspectRatio>
    </FluxMasonry>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxMasonry } from '@flux-ui/components';

    const photos = [
        {url: '/assets/demo/image-1.jpg', alt: 'A quiet street at dusk', aspectRatio: 3 / 4},
        {url: '/assets/demo/image-2.jpg', alt: 'Rooftops seen from a hill', aspectRatio: 4 / 3},
        {url: '/assets/demo/image-3.jpg', alt: 'A wide view of the coastline', aspectRatio: 16 / 9},
        {url: '/assets/demo/image-4.jpg', alt: 'A doorway in the old town', aspectRatio: 2 / 3},
        {url: '/assets/demo/image-5.jpg', alt: 'Morning light on the water', aspectRatio: 1}
    ];
</script>

<style scoped>
    .photo {
        overflow: hidden;
        border-radius: var(--radius);
    }
</style>
