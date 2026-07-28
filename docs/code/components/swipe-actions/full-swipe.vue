<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="18">
        <FluxPane style="width: min(100%, 480px)">
            <FluxPlaceholder
                v-if="mails.length === 0"
                icon="envelope"
                title="Inbox zero"
                message="Every message has been dealt with."/>

            <template
                v-for="(mail, index) in mails"
                :key="mail.subject">
                <FluxSeparator v-if="index > 0"/>

                <FluxSwipeActions :threshold="0.4">
                    <FluxItem style="padding: 18px">
                        <FluxItemContent is-center>
                            <strong>{{ mail.from }}</strong>
                            <span style="font-size: .875rem; opacity: .6">{{ mail.subject }}</span>
                        </FluxItemContent>
                    </FluxItem>

                    <template #end>
                        <FluxSwipeAction
                            icon="box-archive"
                            label="Archive"
                            @click="remove(mail.subject)"/>

                        <FluxSwipeAction
                            color="danger"
                            icon="trash"
                            label="Delete"
                            @click="remove(mail.subject)"/>
                    </template>
                </FluxSwipeActions>
            </template>
        </FluxPane>

        <FluxSecondaryButton
            icon-leading="rotate-left"
            label="Reset"
            @click="mails = [...initialMails]"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxItem, FluxItemContent, FluxPane, FluxPlaceholder, FluxSecondaryButton, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';
    import { ref } from 'vue';

    const initialMails = [
        {from: 'Bas Milius', subject: 'Release notes for 2.4'},
        {from: 'Jane Doe', subject: 'Design review on Thursday'},
        {from: 'John Doe', subject: 'Invoice 2026-0184'}
    ];

    const mails = ref([...initialMails]);

    function remove(subject: string): void {
        mails.value = mails.value.filter(mail => mail.subject !== subject);
    }
</script>
