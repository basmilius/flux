<template>
    <FluxAiReasoning
        v-model:is-expanded="isExpanded"
        :duration="26">
        <FluxAiStreamingText :content="content"/>
    </FluxAiReasoning>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiReasoning, FluxAiStreamingText } from '@flux-ui/ai';
    import { ref } from 'vue';

    const content = [
        'The report has to cover three things:',
        '',
        '1. which regions finished',
        '2. why one of them was skipped',
        '3. how to retry it',
        '',
        'The skipped region shows `draining` in the health check, so the deploy',
        'stepped over it on purpose.'
    ].join('\n');

    const isExpanded = ref(true);
</script>
