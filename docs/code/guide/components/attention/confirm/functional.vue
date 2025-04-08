<template>
    <FluxStack
        :gap="12"
        style="align-items: start">
        <FluxPrimaryButton
            label="Show confirm"
            @click="show()"/>

        <span v-if="result === true">✅ Accepted</span>
        <span v-if="result === false">❌ Declined</span>
        <span v-if="result === null">⌛️ Waiting for confirmation...</span>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, FluxStack, showConfirm } from '@flux-ui/flux';
    import { ref } from 'vue';

    const result = ref<boolean | null>(null);

    async function show(): Promise<void> {
        result.value = null;
        result.value = await showConfirm({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Are you sure?'
        });
    }
</script>
