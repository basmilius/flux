<template>
    <FluxAiConversation>
        <FluxAiMessage
            icon="sparkles"
            role="assistant"
            when="15:56">
            The migration renames `total_incl_vat` to `total_gross`. Both columns exist during the deploy, so a rollback stays possible for one release.

            <template #actions>
                <FluxAction
                    icon="copy"
                    aria-label="Copy"
                    @click="copy"/>

                <FluxAction
                    icon="rotate"
                    aria-label="Retry"/>

                <FluxAction
                    :is-active="rating === 'up'"
                    icon="thumbs-up"
                    aria-label="Good answer"
                    @click="rate('up')"/>

                <FluxAction
                    :is-active="rating === 'down'"
                    icon="thumbs-down"
                    aria-label="Bad answer"
                    @click="rate('down')"/>
            </template>
        </FluxAiMessage>
    </FluxAiConversation>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiConversation, FluxAiMessage } from '@flux-ui/ai';
    import { FluxAction, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<'down' | 'up' | null>(null);

    function copy(): void {
        showSnackbar({
            icon: 'circle-check',
            message: 'Answer copied to the clipboard.'
        });
    }

    function rate(value: 'down' | 'up'): void {
        rating.value = rating.value === value ? null : value;
    }
</script>
