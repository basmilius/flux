<template>
    <FluxAiConversation>
        <FluxAiMessage role="system">
            The assistant answers in English and never invents a source.
        </FluxAiMessage>

        <FluxAiMessage
            avatar-fallback-initials="BM"
            role="user"
            when="13:08">
            Where does the shipping cost of an order come from?
        </FluxAiMessage>

        <FluxAiMessage
            icon="sparkles"
            role="assistant"
            when="13:08">
            From the carrier rate table, looked up by weight and destination zone. The order stores the resolved amount, so a later rate change does not rewrite history.
        </FluxAiMessage>
    </FluxAiConversation>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
</script>
