<template>
    <FluxAiConversation>
        <FluxAiMessage
            author="Bas"
            avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
            role="user"
            when="12:05">
            Can you check whether the nightly build passed?
        </FluxAiMessage>

        <FluxAiMessage
            author="Flux Copilot"
            icon="robot"
            role="assistant"
            when="12:05">
            It passed at 03:12. Two flaky calendar tests were retried once and then went green.
        </FluxAiMessage>
    </FluxAiConversation>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
</script>
