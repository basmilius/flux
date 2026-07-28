<template>
    <FluxPane style="width: min(100%, 480px)">
        <template
            v-for="(mail, index) in mails"
            :key="mail.subject">
            <FluxSeparator v-if="index > 0"/>

            <FluxSwipeActions
                :open="open && open.subject === mail.subject ? open.side : null"
                @update:open="onOpen(mail.subject, $event)">
                <FluxItem style="padding: 18px">
                    <FluxItemContent is-center>
                        <strong>{{ mail.from }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ mail.subject }}</span>
                    </FluxItemContent>
                </FluxItem>

                <template #end>
                    <FluxSwipeAction
                        icon="box-archive"
                        label="Archive"/>

                    <FluxSwipeAction
                        is-primary
                        color="danger"
                        icon="trash"
                        label="Delete"/>
                </template>
            </FluxSwipeActions>
        </template>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxItem, FluxItemContent, FluxPane, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';
    import { ref } from 'vue';

    type OpenRow = {
        readonly subject: string;
        readonly side: 'start' | 'end';
    };

    const mails = [
        {from: 'Bas Milius', subject: 'Release notes for 2.4'},
        {from: 'Jane Doe', subject: 'Design review on Thursday'},
        {from: 'John Doe', subject: 'Invoice 2026-0184'}
    ];

    const open = ref<OpenRow | null>(null);

    function onOpen(subject: string, side: 'start' | 'end' | null): void {
        open.value = side === null ? null : {subject, side};
    }
</script>
