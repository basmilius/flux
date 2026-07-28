<template>
    <div class="frame">
        <FluxAiConversation>
            <template #empty>
                <FluxPlaceholder
                    icon="sparkles"
                    message="Ask anything about your project. The answer appears here."
                    title="Nothing asked yet"/>
            </template>
        </FluxAiConversation>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation } from '@flux-ui/ai';
    import { FluxPlaceholder } from '@flux-ui/components';
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
