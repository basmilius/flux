<template>
    <FluxSecondaryButton
        :disabled="unreadCount === 0"
        icon-leading="check-double"
        label="Mark all read"
        @click="onMarkAll()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, showSnackbar } from '@flux-ui/components';
    import { useInboxStore } from '@/store';

    const {unreadCount, markAllRead} = useInboxStore();

    async function onMarkAll(): Promise<void> {
        markAllRead();
        await showSnackbar({color: 'success', icon: 'check-double', message: 'All notifications marked as read.'});
    }
</script>
