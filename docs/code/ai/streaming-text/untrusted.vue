<template>
    <FluxAiStreamingText :content="content"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiStreamingText } from '@flux-ui/ai';

    const content = [
        'Everything below came back from a model and none of it becomes markup.',
        '',
        'An <img src=x onerror="alert(1)"> is shown as the text it is, and so is an',
        'inline <b>tag</b> or an <iframe src="https://example.com"></iframe>.',
        '',
        'A [link with a javascript scheme](javascript:alert(2)) loses its href and',
        'stays plain text, while [a normal link](https://example.com) keeps working',
        'and opens with `rel="noopener noreferrer"`.'
    ].join('\n');
</script>
