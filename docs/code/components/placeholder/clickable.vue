<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxDropZone
                v-slot="{ showPicker }"
                @select="onUploaded">
                <FluxPlaceholder
                    is-button
                    icon="files"
                    :title="uploadedFile ? uploadedFile.name : 'Upload invoice'"
                    message="Drop the invoice here or click to upload."
                    @click="showPicker">
                </FluxPlaceholder>
            </FluxDropZone>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDropZone, FluxPane, FluxPaneBody, FluxPlaceholder, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const uploadedFile = ref<File|null>(null);

    function onUploaded(file: File) {
        uploadedFile.value = file;
    }
</script>
