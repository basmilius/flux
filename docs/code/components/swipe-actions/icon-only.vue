<template>
    <FluxPane style="width: min(100%, 480px)">
        <template
            v-for="(mail, index) in mails"
            :key="mail.subject">
            <FluxSeparator v-if="index > 0"/>

            <FluxSwipeActions>
                <FluxItem style="padding: 18px">
                    <FluxItemContent is-center>
                        <strong>{{ mail.from }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ mail.subject }}</span>
                    </FluxItemContent>
                </FluxItem>

                <template #start>
                    <FluxSwipeAction
                        is-primary
                        aria-label="Mark as read"
                        color="info"
                        icon="envelope-open"/>
                </template>

                <template #end>
                    <FluxSwipeAction
                        aria-label="Snooze"
                        icon="clock"/>

                    <FluxSwipeAction
                        aria-label="Archive"
                        color="warning"
                        icon="box-archive"/>

                    <FluxSwipeAction
                        is-primary
                        aria-label="Delete"
                        color="danger"
                        icon="trash"/>
                </template>
            </FluxSwipeActions>
        </template>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxItem, FluxItemContent, FluxPane, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';

    const mails = [
        {from: 'Bas Milius', subject: 'Release notes for 2.4'},
        {from: 'Jane Doe', subject: 'Design review on Thursday'},
        {from: 'John Doe', subject: 'Invoice 2026-0184'}
    ];
</script>
