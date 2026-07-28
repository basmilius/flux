<template>
    <FluxFlex
        direction="vertical"
        :gap="12">
        <FluxAiPromptInput
            v-model="prompt"
            @submit="onSubmit"/>

        <FluxNotice
            v-if="sent"
            color="info"
            icon="paper-plane"
            :message="sent"
            title="Submitted"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiPromptInput } from '@flux-ui/ai';
    import { FluxFlex, FluxNotice } from '@flux-ui/components';
    import { ref } from 'vue';

    const prompt = ref('');
    const sent = ref('');

    function onSubmit(value: string): void {
        sent.value = value;
        prompt.value = '';
    }
</script>
