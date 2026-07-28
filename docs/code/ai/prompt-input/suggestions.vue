<template>
    <FluxAiPromptInput
        v-model="prompt"
        ref="composer"
        placeholder="Ask anything about your workspace..."
        @submit="onSubmit">
        <FluxAiSuggestions
            v-if="!prompt"
            :suggestions="suggestions"
            @select="onSelect"/>
    </FluxAiPromptInput>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiPromptInput, type FluxAiSuggestion, FluxAiSuggestions } from '@flux-ui/ai';
    import { ref, useTemplateRef } from 'vue';

    const composerRef = useTemplateRef('composer');

    const prompt = ref('');

    const suggestions: FluxAiSuggestion[] = [
        {id: 'summary', icon: 'file-lines', label: 'Summarize last week'},
        {id: 'revenue', icon: 'chart-line', label: 'Compare revenue'},
        {id: 'draft', icon: 'wand-magic-sparkles', label: 'Draft a release note'}
    ];

    function onSelect(suggestion: FluxAiSuggestion): void {
        prompt.value = suggestion.label;
        composerRef.value?.focus();
    }

    function onSubmit(value: string): void {
        console.log(value);
        prompt.value = '';
    }
</script>
