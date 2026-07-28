<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <template
                v-for="(mail, index) in mails"
                :key="mail.subject">
                <FluxSeparator v-if="index > 0"/>

                <FluxSwipeActions>
                    <FluxItem style="padding: 18px">
                        <FluxItemMedia
                            is-center
                            :size="40">
                            <FluxAvatar
                                :alt="mail.from"
                                :fallback-initials="mail.initials"
                                :size="40"/>
                        </FluxItemMedia>

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
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxItem, FluxItemContent, FluxItemMedia, FluxPane, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';

    const mails = [
        {from: 'Bas Milius', initials: 'BM', subject: 'Release notes for 2.4'},
        {from: 'Jane Doe', initials: 'JD', subject: 'Design review on Thursday'},
        {from: 'John Doe', initials: 'JD', subject: 'Invoice 2026-0184'}
    ];
</script>
