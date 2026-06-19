<template>
    <FluxPrimaryButton
        icon-leading="circle-plus"
        label="New event"
        @click="onNew()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showPrompt, showSnackbar } from '@flux-ui/components';

    async function onNew(): Promise<void> {
        const title = await showPrompt({
            icon: 'calendar',
            title: 'New event',
            message: 'What would you like to schedule?',
            fieldLabel: 'Event title',
            fieldPlaceholder: 'E.g. Client kickoff'
        });

        if (title) {
            await showSnackbar({icon: 'circle-check', color: 'success', message: `“${title}” added to the calendar.`});
        }
    }
</script>
