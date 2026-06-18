<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItemStack>
                <FluxItem
                    v-for="notification in notifications"
                    :key="notification.title">
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            :color="notification.color"
                            :name="notification.icon"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ notification.title }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ notification.time }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxAction
                            icon="xmark"
                            aria-label="Dismiss"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxAction, FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';

    const notifications: { title: string; time: string; icon: FluxIconName; color: FluxColor }[] = [
        {title: 'Jane Doe started following you', time: '2 minutes ago', icon: 'user-plus', color: 'info'},
        {title: 'John Doe liked your post', time: '1 hour ago', icon: 'heart', color: 'danger'},
        {title: 'New comment on Release notes', time: '3 hours ago', icon: 'message', color: 'primary'}
    ];
</script>
