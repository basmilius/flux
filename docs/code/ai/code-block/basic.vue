<template>
    <FluxAiCodeBlock
        :code="code"
        language="bash"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCodeBlock } from '@flux-ui/ai';

    const code = [
        'bun add @flux-ui/ai',
        'bun run build'
    ].join('\n');
</script>
