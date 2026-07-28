<template>
    <FluxPane style="width: min(100%, 480px)">
        <template
            v-for="(mail, index) in mails"
            :key="mail.subject">
            <FluxSeparator v-if="index > 0"/>

            <FluxSwipeActions :disabled="mail.isLocked">
                <FluxItem style="padding: 18px">
                    <FluxItemContent is-center>
                        <strong>{{ mail.from }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ mail.subject }}</span>
                    </FluxItemContent>

                    <FluxItemActions
                        v-if="mail.isLocked"
                        is-center>
                        <FluxBadge
                            icon="lock"
                            label="Retained"/>
                    </FluxItemActions>
                </FluxItem>

                <template #end>
                    <FluxSwipeAction
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
    import { FluxBadge, FluxItem, FluxItemActions, FluxItemContent, FluxPane, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';

    const mails = [
        {from: 'Bas Milius', subject: 'Release notes for 2.4', isLocked: false},
        {from: 'Legal', subject: 'Retention policy 2026', isLocked: true},
        {from: 'Jane Doe', subject: 'Design review on Thursday', isLocked: false}
    ];
</script>
