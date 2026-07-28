<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <FluxPopConfirm
            confirm-label="Archive"
            icon="box-archive"
            message="Archive this invoice?"
            @confirm="isArchived = true">
            <template #opener="{ toggle }">
                <FluxSecondaryButton
                    icon-leading="box-archive"
                    label="Archive"
                    @click="toggle()"/>
            </template>
        </FluxPopConfirm>

        <span v-if="isArchived">The invoice moved to the archive.</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isArchived = ref(false);
</script>
