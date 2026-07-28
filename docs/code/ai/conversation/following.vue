<template>
    <div class="stack">
        <div class="frame">
            <FluxAiConversation>
                <FluxAiMessage
                    v-for="turn of turns"
                    :key="turn.id"
                    :avatar-fallback-initials="turn.role === 'user' ? 'BM' : undefined"
                    :icon="turn.role === 'assistant' ? 'sparkles' : undefined"
                    :is-streaming="turn.isStreaming"
                    :role="turn.role">
                    {{ turn.content }}
                </FluxAiMessage>
            </FluxAiConversation>
        </div>

        <FluxPrimaryButton
            :is-loading="isAnswering"
            label="Ask again"
            @click="ask"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
    import { FluxPrimaryButton } from '@flux-ui/components';
    import { computed, onBeforeUnmount, ref } from 'vue';

    type Turn = {
        readonly id: number;
        readonly role: 'assistant' | 'user';
        content: string;
        isStreaming: boolean;
    };

    const WORDS = 'A conversation that follows its own tail keeps the newest words in view while they arrive, and steps aside as soon as you scroll up to read something back.'.split(' ');

    const turns = ref<Turn[]>([
        {id: 1, role: 'user', content: 'Why should a chat follow its own tail?', isStreaming: false},
        {id: 2, role: 'assistant', content: WORDS.join(' '), isStreaming: false}
    ]);

    let timer: ReturnType<typeof setInterval> | undefined;
    let nextId = 3;

    const isAnswering = computed(() => turns.value.some(turn => turn.isStreaming));

    onBeforeUnmount(() => clearInterval(timer));

    function ask(): void {
        if (isAnswering.value) {
            return;
        }

        turns.value.push({id: nextId++, role: 'user', content: 'Tell me again.', isStreaming: false});

        const index = turns.value.length;
        turns.value.push({id: nextId++, role: 'assistant', content: '', isStreaming: true});

        let spoken = 0;

        timer = setInterval(() => {
            const answer = turns.value[index];

            answer.content = WORDS.slice(0, ++spoken).join(' ');

            if (spoken === WORDS.length) {
                answer.isStreaming = false;
                clearInterval(timer);
            }
        }, 120);
    }
</script>

<style
    scoped
    lang="css">
    .stack {
        display: flex;
        width: 100%;
        flex-flow: column;
        gap: 15px;
    }

    .frame {
        display: flex;
        height: 240px;
    }
</style>
