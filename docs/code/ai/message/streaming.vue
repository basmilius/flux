<template>
    <FluxAiConversation>
        <FluxAiMessage
            avatar-fallback-initials="BM"
            role="user"
            when="09:30">
            Explain the 3px grid in one sentence.
        </FluxAiMessage>

        <FluxAiMessage
            icon="sparkles"
            :is-streaming="isStreaming"
            role="assistant"
            when="09:30">
            {{ answer }}

            <template #actions>
                <FluxAction
                    icon="copy"
                    aria-label="Copy"/>

                <FluxAction
                    icon="rotate"
                    aria-label="Retry"/>
            </template>
        </FluxAiMessage>
    </FluxAiConversation>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
    import { FluxAction } from '@flux-ui/components';
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

    const WORDS = 'Every dimension, padding and offset is a multiple of three pixels, which keeps components on the same rhythm no matter how they are combined.'.split(' ');

    const spoken = ref(0);

    let timer: ReturnType<typeof setInterval> | undefined;

    const answer = computed(() => WORDS.slice(0, spoken.value).join(' '));
    const isStreaming = computed(() => spoken.value < WORDS.length);

    onMounted(() => {
        timer = setInterval(() => {
            spoken.value = spoken.value < WORDS.length ? spoken.value + 1 : 0;
        }, 200);
    });

    onBeforeUnmount(() => clearInterval(timer));
</script>
