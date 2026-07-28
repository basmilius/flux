<template>
    <FluxPane style="width: min(100%, 480px)">
        <template
            v-for="(notification, index) in notifications"
            :key="notification.title">
            <FluxSeparator v-if="index > 0"/>

            <FluxSwipeActions>
                <FluxItem style="padding: 18px">
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

                    <FluxItemActions
                        v-if="muted.includes(notification.title)"
                        is-center>
                        <FluxBadge
                            icon="bell"
                            label="Muted"/>
                    </FluxItemActions>
                </FluxItem>

                <template #end>
                    <FluxSwipeAction
                        icon="bell"
                        label="Mute"
                        @click="mute(notification.title)"/>
                </template>
            </FluxSwipeActions>
        </template>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { ref } from 'vue';

    const notifications: { title: string; time: string; icon: FluxIconName; color: FluxColor }[] = [
        {title: 'Jane Doe started following you', time: '2 minutes ago', icon: 'user-plus', color: 'info'},
        {title: 'John Doe liked your post', time: '1 hour ago', icon: 'heart', color: 'danger'},
        {title: 'New comment on Release notes', time: '3 hours ago', icon: 'message', color: 'primary'}
    ];

    const muted = ref<string[]>([]);

    function mute(title: string): void {
        if (muted.value.includes(title)) {
            return;
        }

        muted.value.push(title);
    }
</script>
