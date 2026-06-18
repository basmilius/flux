<template>
    <Preview>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="circle-info"
                label="Alert"
                @click="onAlert"/>

            <FluxSecondaryButton
                icon-leading="circle-question"
                label="Confirm"
                @click="onConfirm"/>

            <FluxSecondaryButton
                icon-leading="pen"
                label="Prompt"
                @click="onPrompt"/>

            <FluxPrimaryButton
                icon-leading="bell"
                label="Snackbar"
                @click="onSnackbar"/>
        </FluxButtonStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSecondaryButton, showAlert, showConfirm, showPrompt, showSnackbar } from '@flux-ui/components';

    async function onAlert(): Promise<void> {
        await showAlert({
            icon: 'circle-info',
            title: 'Saved',
            message: 'Your changes were saved successfully.'
        });
    }

    async function onConfirm(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'circle-exclamation',
            title: 'Delete project',
            message: 'This action cannot be undone. Are you sure?'
        });

        if (confirmed) {
            showSnackbar({icon: 'circle-check', message: 'Project deleted.'});
        }
    }

    async function onPrompt(): Promise<void> {
        const name = await showPrompt({
            icon: 'pen',
            title: 'Rename project',
            message: 'Choose a new name for this project.',
            fieldLabel: 'Name'
        });

        if (name) {
            showSnackbar({icon: 'circle-check', message: `Renamed to ${name}.`});
        }
    }

    function onSnackbar(): void {
        showSnackbar({
            icon: 'bell',
            message: 'This is a snackbar notification.'
        });
    }
</script>
