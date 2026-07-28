<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <FluxPopConfirm
            v-for="apiKey of apiKeys"
            :key="apiKey.id"
            confirm-label="Revoke"
            icon="trash"
            is-destructive
            :message="`Revoke the API key ${apiKey.name}? Applications using it stop working immediately.`"
            @confirm="revoke(apiKey.id)">
            <template #opener="{ toggle }">
                <FluxSecondaryButton
                    icon-leading="trash"
                    :label="`Revoke ${apiKey.name}`"
                    @click="toggle()"/>
            </template>
        </FluxPopConfirm>

        <span v-if="apiKeys.length === 0">All API keys have been revoked.</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const apiKeys = ref([
        {id: 1, name: 'Production'},
        {id: 2, name: 'Staging'}
    ]);

    function revoke(id: number): void {
        apiKeys.value = apiKeys.value.filter(apiKey => apiKey.id !== id);
    }
</script>
