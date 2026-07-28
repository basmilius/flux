<template>
    <div class="frame">
        <FluxAiConversation is-grouped>
            <FluxAiMessage
                avatar-fallback-initials="BM"
                day="Monday"
                role="user"
                when="14:31">
                Which tables still miss an index on their foreign keys?
            </FluxAiMessage>

            <FluxAiMessage
                day="Monday"
                icon="sparkles"
                role="assistant"
                when="14:31">
                Three of them: orders, order_lines and shipments. The first two are hit on every checkout.
            </FluxAiMessage>

            <FluxAiMessage
                avatar-fallback-initials="BM"
                day="Today"
                role="user"
                when="08:47">
                Did the migration land?
            </FluxAiMessage>

            <FluxAiMessage
                day="Today"
                icon="sparkles"
                role="assistant"
                when="08:47">
                It did, last night at 02:14. Checkout queries went from 340ms to 12ms on average.
            </FluxAiMessage>
        </FluxAiConversation>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
</script>

<style
    scoped
    lang="css">
    .frame {
        display: flex;
        height: 270px;
        width: 100%;
    }
</style>
