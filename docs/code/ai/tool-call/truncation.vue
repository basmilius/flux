<template>
    <FluxAiToolCall
        :arguments="{path: 'packages/components/src/css/token/palette.scss'}"
        :duration="0.3"
        is-expanded
        name="read_file"
        :result="result"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';

    const result = Array.from({length: 40}, (_, index) => `${index + 1}  --palette-gray-${(index + 1) * 25}: oklch(0.${900 - index * 20} 0.008 264);`).join('\n');
</script>
