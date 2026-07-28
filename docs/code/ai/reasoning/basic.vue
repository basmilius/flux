<template>
    <FluxAiReasoning
        :content="content"
        :duration="9"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiReasoning } from '@flux-ui/ai';

    const content = [
        'The question is about refunds on the starter plan, so the billing export is',
        'the right source rather than the analytics dashboard.',
        '',
        'Refunds went from 11 to 34 last week, and 29 of those name the same reason:',
        'the plan was upgraded within the trial and charged twice.'
    ].join('\n');
</script>
