<template>
    <FluxPrimaryButton
        icon-leading="user-plus"
        label="Add client"
        @click="onAdd()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showPrompt, showSnackbar } from '@flux-ui/components';

    async function onAdd(): Promise<void> {
        const name = await showPrompt({
            icon: 'building',
            title: 'Add client',
            message: 'What is the name of the client?',
            fieldLabel: 'Company name',
            fieldPlaceholder: 'E.g. Acme Inc.'
        });

        if (name) {
            await showSnackbar({icon: 'circle-info', message: 'Adding clients is not persisted in this demo.'});
        }
    }
</script>
