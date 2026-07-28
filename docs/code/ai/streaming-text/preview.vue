<template>
    <Preview>
        <FluxAiStreamingText
            :content="content"
            :is-streaming="isStreaming"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiStreamingText } from '@flux-ui/ai';
    import { computed, ref } from 'vue';

    const RESPONSE = [
        '## Rollout report',
        '',
        'The release reached **three of four** regions. `eu-west-1` is still',
        'draining connections, so it was skipped for now.',
        '',
        '- `us-east-1` finished in 42 seconds',
        '- `us-west-2` finished in 51 seconds',
        '- `ap-southeast-1` finished in 63 seconds',
        '',
        'Retry the last region with:',
        '',
        '```bash',
        'flux deploy --region eu-west-1 --retry',
        '```',
        '',
        'The full log is on the [releases page](https://example.com/releases).'
    ].join('\n');

    const cursor = ref(0);

    const content = computed(() => RESPONSE.slice(0, cursor.value));
    const isStreaming = computed(() => cursor.value < RESPONSE.length);

    useInterval(45, () => {
        cursor.value = cursor.value > RESPONSE.length + 45 ? 0 : cursor.value + 3;
    });
</script>
