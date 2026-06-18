<template>
    <Preview>
        <FluxPane style="width: min(100%, 600px)">
            <FluxPaneHeader title="Re: Quarterly report"/>

            <FluxPaneBody>
                <FluxFlex
                    direction="vertical"
                    :gap="18">
                    <FluxNoticeStack>
                        <FluxNotice
                            color="info"
                            icon="circle-info"
                            title="Shared thread"
                            :message="`This conversation is shared with ${participants} people in your workspace.`"/>

                        <FluxNotice
                            color="success"
                            icon="circle-check"
                            message="All attachments have been scanned and are safe to open."/>
                    </FluxNoticeStack>

                    <FluxComment
                        v-for="message in thread"
                        :key="message.id"
                        :avatar-alt="message.from"
                        :avatar-fallback-initials="message.initials"
                        :avatar-fallback-icon="message.isReceived ? undefined : 'user'"
                        :posted-by="message.from"
                        :posted-on="message.postedOn"
                        :is-received="message.isReceived">
                        {{ message.body }}
                    </FluxComment>

                    <FluxFlex
                        align="center"
                        :gap="9">
                        <FluxSpacer/>

                        <FluxSecondaryButton
                            icon-leading="paper-plane"
                            label="Reply"/>
                    </FluxFlex>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment, FluxFlex, FluxNotice, FluxNoticeStack, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { DateTime } from 'luxon';

    const participants = 4;

    const thread = Array.from({length: 4}, (_, index) => {
        const isReceived = index % 2 === 0;
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            id: index,
            from: isReceived ? `${firstName} ${lastName}` : 'You',
            initials: `${firstName[0]}${lastName[0]}`,
            body: faker.lorem.sentences(2),
            isReceived,
            postedOn: DateTime.now().minus({minutes: (4 - index) * 12})
        };
    });
</script>
