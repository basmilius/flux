<template>
    <FluxPrimaryButton
        icon-leading="circle-plus"
        label="Add deal"
        @click="onAdd()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showPrompt, showSnackbar } from '@flux-ui/components';

    async function onAdd(): Promise<void> {
        const title = await showPrompt({
            icon: 'sack-dollar',
            title: 'Add deal',
            message: 'Give this opportunity a name.',
            fieldLabel: 'Deal name',
            fieldPlaceholder: 'E.g. Acme platform rebuild'
        });

        if (title) {
            await showSnackbar({icon: 'circle-info', message: 'Adding deals is not persisted in this demo.'});
        }
    }
</script>
