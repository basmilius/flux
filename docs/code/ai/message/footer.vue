<template>
    <FluxAiConversation>
        <FluxAiMessage
            icon="sparkles"
            role="assistant"
            when="17:22">
            The invoice was already paid on 12 July, so the reminder that went out this morning was a duplicate.

            <template #footer>
                Answered from 3 sources in 1.4s.
            </template>

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
</script>
