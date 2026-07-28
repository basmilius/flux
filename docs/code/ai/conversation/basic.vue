<template>
    <div class="frame">
        <FluxAiConversation>
            <FluxAiMessage
                v-for="message of messages"
                :key="message.id"
                :avatar-fallback-initials="message.role === 'user' ? 'BM' : undefined"
                :icon="message.role === 'assistant' ? 'sparkles' : undefined"
                :role="message.role"
                :when="message.when">
                {{ message.content }}
            </FluxAiMessage>
        </FluxAiConversation>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';

    const messages = [
        {id: 1, role: 'user', when: '11:02', content: 'Summarize the release notes of version 2.4.0.'},
        {id: 2, role: 'assistant', when: '11:02', content: 'Version 2.4.0 adds swimlanes to the kanban board, fixes the column resolution of table cells and rebuilds the color tokens around light-dark().'},
        {id: 3, role: 'user', when: '11:04', content: 'Which of those is breaking?'},
        {id: 4, role: 'assistant', when: '11:04', content: 'Only the color tokens. The unprefixed scales were removed, so --primary-500 no longer resolves. Use --primary-solid instead.'}
    ] as const;
</script>

<style
    scoped
    lang="css">
    .frame {
        display: flex;
        height: 240px;
        width: 100%;
    }
</style>
