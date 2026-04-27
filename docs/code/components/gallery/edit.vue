<template>
    <FluxPane :style="{ width: '50%' }">
        <FluxPaneBody>
            <FluxGallery
                is-editable
                :items="items"
                @upload="uploaded"
                @delete="deleted"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxGallery, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const items = ref([
        "/assets/demo/image-1.jpg",
        "/assets/demo/image-2.jpg",
        "/assets/demo/image-3.jpg",
        "/assets/demo/image-4.jpg",
        "/assets/demo/image-5.jpg"
    ]);

    function uploaded(files: File[]): void {
        files.forEach(file => items.value = [...items.value, URL.createObjectURL(file)]);
    }

    function deleted(index: number): void {
        items.value = items.value.filter((_, i) => i !== index);
    }
</script>
