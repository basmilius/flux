<template>
    <FluxFlex
        direction="vertical"
        :gap="12">
        <FluxAiSuggestions
            :suggestions="suggestions"
            @select="onSelect"/>

        <FluxText
            v-if="picked"
            color="muted">
            You picked: {{ picked }}
        </FluxText>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { type FluxAiSuggestion, FluxAiSuggestions } from '@flux-ui/ai';
    import { FluxFlex, FluxText } from '@flux-ui/components';
    import { ref } from 'vue';

    const picked = ref('');

    const suggestions: FluxAiSuggestion[] = [
        {id: 'summary', label: 'Summarize last week'},
        {id: 'revenue', label: 'Compare revenue'},
        {id: 'draft', label: 'Draft a release note'}
    ];

    function onSelect(suggestion: FluxAiSuggestion): void {
        picked.value = suggestion.label;
    }
</script>
