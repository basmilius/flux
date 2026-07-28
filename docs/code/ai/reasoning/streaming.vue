<template>
    <FluxAiReasoning
        v-model:is-expanded="isExpanded"
        :content="content"
        :duration="14"
        :is-streaming="isStreaming"/>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiReasoning } from '@flux-ui/ai';
    import { computed, ref } from 'vue';

    const THOUGHTS = [
        'Two invoices carry the same number, which should not be possible.',
        '',
        'Both were created in the same second by the same worker, so the sequence',
        'was read twice before it was written back. That is a race, not bad data.'
    ].join('\n');

    const cursor = ref(0);
    const isExpanded = ref(true);

    const content = computed(() => THOUGHTS.slice(0, cursor.value));
    const isStreaming = computed(() => cursor.value < THOUGHTS.length);

    useInterval(45, () => {
        cursor.value = cursor.value > THOUGHTS.length + 90 ? 0 : cursor.value + 3;
    });
</script>
