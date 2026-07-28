<template>
    <div class="stack">
        <div class="frame">
            <FluxAiConversation
                ref="conversation"
                :is-sticky="false">
                <FluxAiMessage
                    v-for="turn of turns"
                    :key="turn"
                    :icon="turn % 2 === 0 ? 'sparkles' : undefined"
                    :role="turn % 2 === 0 ? 'assistant' : 'user'">
                    Turn {{ turn }} of a conversation that never moves on its own.
                </FluxAiMessage>
            </FluxAiConversation>
        </div>

        <FluxButtonStack>
            <FluxSecondaryButton
                label="Add a turn"
                @click="turns.push(turns.length + 1)"/>

            <FluxPrimaryButton
                label="Jump to latest"
                @click="conversation?.scrollToBottom()"/>
        </FluxButtonStack>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
    import { FluxButtonStack, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
    import { ref, useTemplateRef } from 'vue';

    const conversation = useTemplateRef<InstanceType<typeof FluxAiConversation>>('conversation');
    const turns = ref([1, 2, 3, 4, 5, 6, 7, 8]);
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
