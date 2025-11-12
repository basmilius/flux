<template>
    <FluxDropZone>
        <FluxPlaceholder
            icon="square-dashed"
            message="You can drop your files here for uploading..."
            style="width: 100%">
            <FluxSecondaryButton label="Upload"/>
        </FluxPlaceholder>
    </FluxDropZone>
</template>

<script
    lang="ts"
    setup>
    import { FluxDropZone, FluxPlaceholder, FluxSecondaryButton } from '@flux-ui/components';
</script>
