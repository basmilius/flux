<template>
    <Preview>
        <FluxAiReasoning
            :content="content"
            :duration="17"
            :is-streaming="isStreaming"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiReasoning } from '@flux-ui/ai';
    import { computed, ref } from 'vue';

    const THOUGHTS = [
        'The user asks which regions failed, so I need the rollout log first.',
        '',
        'Three regions report a green health check. The fourth one, eu-west-1, is',
        'still draining connections, which is why the deploy skipped it instead of',
        'failing outright.',
        '',
        'That means the answer is a partial success plus a retry command.'
    ].join('\n');

    const cursor = ref(0);

    const content = computed(() => THOUGHTS.slice(0, cursor.value));
    const isStreaming = computed(() => cursor.value < THOUGHTS.length);

    useInterval(45, () => {
        cursor.value = cursor.value > THOUGHTS.length + 90 ? 0 : cursor.value + 3;
    });
</script>
