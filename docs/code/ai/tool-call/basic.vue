<template>
    <FluxAiToolCall
        :arguments="{city: 'Rotterdam', unit: 'celsius'}"
        :duration="0.4"
        name="get_weather"
        result='{"temperature": 14, "condition": "light rain"}'/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';
</script>
