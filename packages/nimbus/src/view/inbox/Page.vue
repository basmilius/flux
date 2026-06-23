<template>
    <FluxApplicationContent layout="medium">
        <FluxFlex
            class="toolbar"
            justify="end">
            <FluxSegmentedControl
                v-model="filter"
                aria-label="Filter notifications">
                <FluxSegmentedControlItem
                    label="All"
                    value="all"/>
                <FluxSegmentedControlItem
                    :label="`Unread (${unreadCount})`"
                    value="unread"/>
            </FluxSegmentedControl>
        </FluxFlex>

        <FluxFlex
            v-if="isLoading"
            direction="vertical"
            :gap="9">
            <FluxSkeleton
                v-for="n of 6"
                :key="n"
                height="60"
                variant="rounded"/>
        </FluxFlex>

        <FluxVirtualScroller
            v-else-if="visible.length > 0"
            class="list"
            :estimated-item-height="66"
            :items="visible">
            <template #default="{item}">
                <FluxClickablePane
                    variant="flat"
                    @click="open(item)">
                    <FluxItem :class="{unread: !item.read}">
                        <FluxItemMedia
                            is-center
                            :size="40">
                            <FluxBoxedIcon
                                :color="TYPE_COLOR[item.type]"
                                :name="TYPE_ICON[item.type]"
                                :size="40"/>
                        </FluxItemMedia>
                        <FluxItemContent is-center>
                            <strong>{{ item.title }}</strong>
                            <span>{{ item.body }}</span>
                        </FluxItemContent>
                        <FluxItemActions is-center>
                            <FluxText
                                class="time"
                                color="muted"
                                size="small">{{ item.createdAt.toRelative() }}</FluxText>
                            <span
                                v-if="!item.read"
                                class="dot"/>
                        </FluxItemActions>
                    </FluxItem>
                </FluxClickablePane>
            </template>
        </FluxVirtualScroller>

        <FluxPane v-else>
            <FluxPaneBody>
                <FluxPlaceholder
                    icon="inbox"
                    message="You have no notifications here."
                    title="Inbox zero"/>
            </FluxPaneBody>
        </FluxPane>

        <FluxSlideOver
            is-closeable
            @close="selected = null">
            <FluxPane
                v-if="selected"
                class="detail">
                <FluxPaneHeader
                    :icon="TYPE_ICON[selected.type]"
                    :title="selected.title"/>
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="15">
                        <FluxText
                            size="medium"
                            tag="p">{{ selected.body }}</FluxText>
                        <FluxFlex
                            align="center"
                            :gap="6">
                            <FluxIcon name="clock"/>
                            <FluxText
                                color="muted"
                                size="small">{{ selected.createdAt.toFormat('cccc, LLL d · HH:mm') }}</FluxText>
                        </FluxFlex>
                    </FluxFlex>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSecondaryButton
                        icon-leading="envelope"
                        label="Mark unread"
                        @click="markUnread()"/>
                    <FluxSpacer/>
                    <FluxPrimaryButton
                        v-if="selected.to"
                        icon-trailing="arrow-right"
                        label="Open"
                        @click="goTo()"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSlideOver>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBoxedIcon, FluxClickablePane, FluxFlex, FluxIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPlaceholder, FluxPrimaryButton, FluxSecondaryButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxSkeleton, FluxSlideOver, FluxSpacer, FluxText, FluxVirtualScroller } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { defineTitle } from '@/composable';
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

    defineTitle('inbox', 'Inbox');

    const router = useRouter();
    const {notifications, unreadCount, markRead} = useInboxStore();

    const filter = ref<string | number>('all');
    const selected = ref<Notification | null>(null);
    const isLoading = ref(true);

    onMounted(() => {
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    });

    const visible = computed(() => filter.value === 'unread'
        ? notifications.value.filter(notification => !notification.read)
        : notifications.value);

    function open(notification: Notification): void {
        markRead(notification.id);
        selected.value = notification;
    }

    function markUnread(): void {
        if (selected.value) {
            markRead(selected.value.id, false);
            selected.value = null;
        }
    }

    function goTo(): void {
        const target = selected.value?.to;
        selected.value = null;

        if (target) {
            router.push({name: target.name, params: target.params});
        }
    }
</script>

<style scoped>
    .toolbar {
        margin-bottom: 18px;
    }

    .list {
        height: calc(100dvh - 240px);
    }

    .unread strong {
        font-weight: 600;
    }

    .time {
        white-space: nowrap;
    }

    .dot {
        width: 9px;
        height: 9px;
        background: var(--primary-500);
        border-radius: 50%;
    }

    .detail {
        width: min(450px, 100dvw - 30px);
    }
</style>
