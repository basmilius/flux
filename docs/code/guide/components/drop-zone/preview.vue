<template>
    <Preview>
        <FluxDropZone
            is-empty
            placeholder-button="Upload"
            placeholder-icon="square-dashed"
            placeholder-message="You can drop your files here for uploading..."
            style="width: 100%"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxDropZone } from '@basmilius/flux';
</script>
