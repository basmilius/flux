<template>
    <Preview>
        <FluxAiCodeBlock
            :code="code"
            language="ts"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCodeBlock } from '@flux-ui/ai';

    const code = [
        'export function slugify(value: string): string {',
        '    return value',
        '        .toLowerCase()',
        '        .replace(/[^a-z0-9]+/g, \'-\')',
        '        .replace(/^-|-$/g, \'\');',
        '}'
    ].join('\n');
</script>
