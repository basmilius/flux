<template>
    <FluxPrimaryButton
        icon-leading="circle-plus"
        label="New goal"
        @click="onNew()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showPrompt, showSnackbar } from '@flux-ui/components';

    async function onNew(): Promise<void> {
        const title = await showPrompt({
            icon: 'bullseye',
            title: 'New goal',
            message: 'What do you want to achieve this quarter?',
            fieldLabel: 'Objective',
            fieldPlaceholder: 'E.g. Improve onboarding completion'
        });

        if (title) {
            await showSnackbar({icon: 'circle-info', message: 'Creating goals is not persisted in this demo.'});
        }
    }
</script>
