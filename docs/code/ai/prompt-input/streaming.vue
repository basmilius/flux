<template>
    <FluxAiPromptInput
        v-model="prompt"
        :is-streaming="isStreaming"
        placeholder="Ask a follow-up question..."
        @stop="onStop"
        @submit="onSubmit"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiPromptInput } from '@flux-ui/ai';
    import { onUnmounted, ref } from 'vue';

    const isStreaming = ref(false);
    const prompt = ref('');

    let timer: ReturnType<typeof setTimeout> | undefined;

    onUnmounted(() => clearTimeout(timer));

    function onStop(): void {
        clearTimeout(timer);
        isStreaming.value = false;
    }

    function onSubmit(): void {
        prompt.value = '';
        isStreaming.value = true;
        timer = setTimeout(() => isStreaming.value = false, 4000);
    }
</script>
