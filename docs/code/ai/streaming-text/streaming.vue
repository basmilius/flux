<template>
    <FluxAiStreamingText
        :content="content"
        :is-streaming="isStreaming"/>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiStreamingText } from '@flux-ui/ai';
    import { computed, ref } from 'vue';

    const RESPONSE = [
        'Two things stand out in **last week** numbers.',
        '',
        'Checkout conversion went up by *4.1%*, mostly on mobile. The new address',
        'autocomplete removed a step, and the drop off on that screen fell from',
        '18% to 7%.',
        '',
        'Refunds went up too, but only for the `starter` plan. That is worth a',
        'closer look before the next pricing change.'
    ].join('\n');

    const cursor = ref(0);

    const content = computed(() => RESPONSE.slice(0, cursor.value));
    const isStreaming = computed(() => cursor.value < RESPONSE.length);

    useInterval(40, () => {
        cursor.value = cursor.value > RESPONSE.length + 60 ? 0 : cursor.value + 2;
    });
</script>
