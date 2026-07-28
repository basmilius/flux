<template>
    <FluxAiSuggestions
        :suggestions="suggestions"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import { type FluxAiSuggestion, FluxAiSuggestions } from '@flux-ui/ai';

    const suggestions: FluxAiSuggestion[] = [
        {id: 'summary', icon: 'file-lines', label: 'Summarize this document'},
        {id: 'chart', icon: 'chart-line', label: 'Plot the trend'},
        {id: 'alt', icon: 'image', label: 'Write alt text'},
        {id: 'rewrite', icon: 'wand-magic-sparkles', label: 'Rewrite in plain language'},
        {id: 'ideas', icon: 'sparkles', label: 'Give me three ideas'},
        {id: 'email', icon: 'paper-plane', label: 'Turn this into an email'}
    ];

    function onSelect(suggestion: FluxAiSuggestion): void {
        console.log(suggestion);
    }
</script>
