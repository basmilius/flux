<template>
    <FluxFlyout :width="372">
        <template #opener="{toggle}">
            <span
                class="notifications-opener"
                data-tour="notifications">
                <FluxSecondaryLinkButton
                    icon-leading="bell"
                    size="small"
                    @click="toggle()"/>

                <span
                    v-if="unreadCount > 0"
                    class="notifications-dot">
                    {{ unreadCount }}
                </span>
            </span>
        </template>

        <template #default="{close}">
            <FluxPane>
                <FluxPaneHeader
                    icon="bell"
                    title="Notifications">
                    <template #after>
                        <FluxSecondaryButton
                            v-if="unreadCount > 0"
                            label="Mark all read"
                            @click="markAllRead()"/>
                    </template>
                </FluxPaneHeader>

                <FluxPaneBody v-if="recent.length === 0">
                    <p class="notifications-empty">You're all caught up.</p>
                </FluxPaneBody>

                <div
                    v-else
                    class="notifications-list">
                    <FluxClickablePane
                        v-for="notification of recent"
                        :key="notification.id"
                        variant="flat"
                        @click="onOpen(notification, close)">
                        <FluxItem>
                            <FluxItemMedia
                                is-center
                                :size="36">
                                <FluxBoxedIcon
                                    :color="TYPE_COLOR[notification.type]"
                                    :name="TYPE_ICON[notification.type]"
                                    :size="36"/>
                            </FluxItemMedia>

                            <FluxItemContent is-center>
                                <strong>{{ notification.title }}</strong>
                                <span>{{ notification.body }}</span>
                            </FluxItemContent>

                            <FluxItemActions is-center>
                                <span
                                    v-if="!notification.read"
                                    class="notifications-unread"/>
                            </FluxItemActions>
                        </FluxItem>
                    </FluxClickablePane>
                </div>

                <FluxPaneFooter>
                    <FluxSecondaryButton
                        icon-trailing="arrow-right"
                        is-fluid
                        label="Open inbox"
                        type="route"
                        :to="{name: 'inbox'}"
                        @click="close()"/>
                </FluxPaneFooter>
            </FluxPane>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxClickablePane, FluxFlyout, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton, FluxSecondaryLinkButton } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useInboxStore } from '@/store';
    import type { Notification, NotificationType } from '@/types';

    const TYPE_ICON: Record<NotificationType, FluxIconName> = {
        mention: 'at',
        assignment: 'list-check',
        comment: 'comment',
        invoice: 'file-invoice-dollar',
        deal: 'sack-dollar',
        system: 'circle-info'
    };

    const TYPE_COLOR: Record<NotificationType, FluxColor> = {
        mention: 'primary',
        assignment: 'info',
        comment: 'info',
        invoice: 'success',
        deal: 'warning',
        system: 'gray'
    };

    const router = useRouter();
    const {notifications, unreadCount, markRead, markAllRead} = useInboxStore();

    const recent = computed(() => notifications.value.slice(0, 6));

    function onOpen(notification: Notification, close: () => void): void {
        markRead(notification.id);
        close();

        if (notification.to) {
            router.push({name: notification.to.name, params: notification.to.params});
        } else {
            router.push({name: 'inbox'});
        }
    }
</script>

<style scoped>
    .notifications-opener {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .notifications-dot {
        position: absolute;
        top: -3px;
        right: -3px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        font-size: 11px;
        font-weight: 600;
        line-height: 1;
        color: #fff;
        background: var(--danger-500);
        border: 2px solid var(--surface);
        border-radius: 9px;
        pointer-events: none;
    }

    .notifications-empty {
        margin: 0;
        font-size: 13px;
        color: var(--gray-500);
    }

    .notifications-list {
        display: flex;
        flex-flow: column;
        max-height: 360px;
        overflow-y: auto;
    }

    .notifications-unread {
        width: 9px;
        height: 9px;
        background: var(--primary-500);
        border-radius: 50%;
    }
</style>
