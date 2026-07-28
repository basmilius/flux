<template>
    <Preview>
        <FluxAiConversation>
            <FluxAiMessage
                avatar-fallback-initials="BM"
                date-time="2026-07-28T10:41:00+02:00"
                role="user"
                when="10:41">
                What is the difference between a badge and a tag?
            </FluxAiMessage>

            <FluxAiMessage
                date-time="2026-07-28T10:41:00+02:00"
                icon="sparkles"
                role="assistant"
                when="10:41">
                A badge labels an entity: a status, a count, a state. A tag labels a choice the user made and can usually be removed again.

                <template #actions>
                    <FluxAction
                        icon="copy"
                        aria-label="Copy"/>

                    <FluxAction
                        icon="rotate"
                        aria-label="Retry"/>

                    <FluxAction
                        icon="thumbs-up"
                        aria-label="Good answer"/>

                    <FluxAction
                        icon="thumbs-down"
                        aria-label="Bad answer"/>
                </template>
            </FluxAiMessage>
        </FluxAiConversation>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
    import { FluxAction } from '@flux-ui/components';
</script>
