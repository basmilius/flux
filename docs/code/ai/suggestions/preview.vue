<template>
    <Preview>
        <FluxAiSuggestions
            :suggestions="suggestions"
            @select="onSelect"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { type FluxAiSuggestion, FluxAiSuggestions } from '@flux-ui/ai';

    const suggestions: FluxAiSuggestion[] = [
        {id: 'summary', icon: 'file-lines', label: 'Summarize last week'},
        {id: 'revenue', icon: 'chart-line', label: 'Compare revenue'},
        {id: 'draft', icon: 'wand-magic-sparkles', label: 'Draft a release note'},
        {id: 'ideas', icon: 'sparkles', label: 'Give me three ideas'}
    ];

    function onSelect(suggestion: FluxAiSuggestion): void {
        console.log(suggestion);
    }
</script>
