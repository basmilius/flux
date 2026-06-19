<template>
    <FluxPrimaryButton
        icon-leading="user-plus"
        label="Invite member"
        @click="onInvite()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showPrompt, showSnackbar } from '@flux-ui/components';

    async function onInvite(): Promise<void> {
        const email = await showPrompt({
            icon: 'envelope',
            title: 'Invite a team member',
            message: 'Enter the email address of the person you want to invite.',
            fieldLabel: 'Email',
            fieldPlaceholder: 'name@nimbus.studio'
        });

        if (email) {
            await showSnackbar({icon: 'paper-plane', color: 'success', message: `Invite sent to ${email}.`});
        }
    }
</script>
