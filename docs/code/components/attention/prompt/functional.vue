<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <FluxPrimaryButton
            label="Show prompt"
            @click="show()"/>

        <span v-if="result">{{ result }}</span>
        <span v-else-if="result === false">❌ Canceled</span>
        <span v-else>⌛️ Waiting for prompt...</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPrimaryButton, showPrompt } from '@flux-ui/components';
    import { ref } from 'vue';

    const result = ref<string | false | null>(null);

    async function show(): Promise<void> {
        result.value = null;
        result.value = await showPrompt({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'What is your name?',
            fieldLabel: 'Name'
        });
    }
</script>
