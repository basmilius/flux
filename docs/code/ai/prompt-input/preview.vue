<template>
    <Preview>
        <FluxAiPromptInput
            v-model="prompt"
            placeholder="Ask anything about your workspace..."
            @submit="onSubmit"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiPromptInput } from '@flux-ui/ai';
    import { ref } from 'vue';

    const prompt = ref('');

    function onSubmit(value: string): void {
        console.log(value);
        prompt.value = '';
    }
</script>
