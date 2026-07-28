<template>
    <FluxFlex
        direction="vertical"
        :gap="15">
        <FluxSecondaryButton
            icon-leading="plus"
            label="Add notification"
            @click="add"/>

        <FluxStaggerTransition
            appear
            style="display: flex; flex-flow: column; gap: 9px;">
            <FluxPane
                v-for="notification of notifications"
                :key="notification.id"
                style="display: flex; align-items: center; gap: 12px; padding: 12px 15px;">
                <FluxIcon
                    color="primary"
                    :name="notification.icon"/>

                <span style="flex-grow: 1;">{{ notification.message }}</span>

                <FluxSecondaryButton
                    aria-label="Dismiss"
                    icon-leading="xmark"
                    size="small"
                    @click="dismiss(notification.id)"/>
            </FluxPane>
        </FluxStaggerTransition>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxIcon, FluxPane, FluxSecondaryButton, FluxStaggerTransition } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { ref } from 'vue';

    type Notification = {
        readonly id: number;
        readonly icon: FluxIconName;
        readonly message: string;
    };

    const templates: readonly Omit<Notification, 'id'>[] = [
        {icon: 'envelope', message: 'Sarah replied to your comment'},
        {icon: 'circle-check', message: 'Deployment finished successfully'},
        {icon: 'star', message: 'Your report is ready to review'},
        {icon: 'bell', message: 'Three invoices are due this week'}
    ];

    const notifications = ref<Notification[]>(templates.slice(0, 3).map((template, index) => ({id: index, ...template})));

    let nextId = 3;

    function add(): void {
        notifications.value = [{id: nextId, ...templates[nextId % templates.length]}, ...notifications.value];
        ++nextId;
    }

    function dismiss(id: number): void {
        notifications.value = notifications.value.filter(notification => notification.id !== id);
    }
</script>
