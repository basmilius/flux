<template>
    <FluxDropZone
        accept="image/*,.pdf"
        aria-label="Drop files to attach them to your prompt"
        is-multiple
        @select-multiple="onSelectMultiple">
        <FluxAiPromptInput
            v-model="prompt"
            v-model:attachments="attachments"
            accept="image/*,.pdf"
            placeholder="Drop a file here or use the paperclip..."
            @submit="onSubmit"/>
    </FluxDropZone>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiPromptInput } from '@flux-ui/ai';
    import { FluxDropZone } from '@flux-ui/components';
    import { ref } from 'vue';

    const attachments = ref<File[]>([]);
    const prompt = ref('');

    function onSelectMultiple(files: FileList): void {
        attachments.value = [...attachments.value, ...files];
    }

    function onSubmit(value: string): void {
        console.log(value, attachments.value);

        attachments.value = [];
        prompt.value = '';
    }
</script>
