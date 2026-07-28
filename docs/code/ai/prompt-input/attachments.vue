<template>
    <FluxAiPromptInput
        v-model="prompt"
        v-model:attachments="attachments"
        accept="image/*,.pdf"
        placeholder="Describe what you want to know about these files..."
        @submit="onSubmit"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiPromptInput } from '@flux-ui/ai';
    import { ref } from 'vue';

    const attachments = ref<File[]>([]);
    const prompt = ref('');

    function onSubmit(value: string): void {
        console.log(value, attachments.value);

        attachments.value = [];
        prompt.value = '';
    }
</script>
