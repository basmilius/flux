<template>
    <Preview>
        <div class="frame">
            <FluxAiConversation>
                <FluxAiMessage
                    avatar-fallback-initials="BM"
                    date-time="2026-07-28T09:12:00+02:00"
                    role="user"
                    when="09:12">
                    How do I keep a chat pinned to the newest message?
                </FluxAiMessage>

                <FluxAiMessage
                    date-time="2026-07-28T09:12:00+02:00"
                    icon="sparkles"
                    role="assistant"
                    when="09:12">
                    Follow the tail for as long as the reader is at the bottom, and let go the moment they scroll up to read something back.
                </FluxAiMessage>

                <FluxAiMessage
                    avatar-fallback-initials="BM"
                    date-time="2026-07-28T09:13:00+02:00"
                    role="user"
                    when="09:13">
                    And when they want to come back?
                </FluxAiMessage>

                <FluxAiMessage
                    date-time="2026-07-28T09:13:00+02:00"
                    icon="sparkles"
                    role="assistant"
                    when="09:13">
                    Scrolling back to the bottom picks the tail up again. The button that appears while you are reading back takes you there in one click.
                </FluxAiMessage>
            </FluxAiConversation>
        </div>
    </Preview>
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
        height: 240px;
        width: 100%;
    }
</style>
