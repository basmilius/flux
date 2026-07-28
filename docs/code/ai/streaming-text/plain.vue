<template>
    <FluxAiStreamingText
        :content="content"
        :has-markdown="false"
        :is-streaming="isStreaming"/>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiStreamingText } from '@flux-ui/ai';
    import { computed, ref } from 'vue';

    const RESPONSE = [
        'Subject: Access to the staging database',
        '',
        'Hi Marit,',
        '',
        'Could you add me to the staging database group? I need it to reproduce',
        'the invoice rounding issue that came in this morning.',
        '',
        'Thanks,',
        'Sam'
    ].join('\n');

    const cursor = ref(0);

    const content = computed(() => RESPONSE.slice(0, cursor.value));
    const isStreaming = computed(() => cursor.value < RESPONSE.length);

    useInterval(40, () => {
        cursor.value = cursor.value > RESPONSE.length + 60 ? 0 : cursor.value + 2;
    });
</script>
