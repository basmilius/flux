<template>
    <Preview>
        <FluxPane style="width: 100%; overflow: hidden">
            <FluxFlex
                align="center"
                :gap="9"
                style="padding: 12px 15px; background: var(--surface)">
                <FluxIcon name="bell"/>

                <FluxFader
                    :interval="3000"
                    style="flex-grow: 1; height: 21px">
                    <FluxFaderItem
                        v-for="(headline, index) in headlines"
                        :key="index">
                        <span style="font-size: .875rem; opacity: .8">{{ headline }}</span>
                    </FluxFaderItem>
                </FluxFader>

                <FluxBadge
                    color="primary"
                    :label="`${messages.length}`"/>
            </FluxFlex>

            <div style="height: 360px; border-top: 1px solid var(--surface-stroke)">
                <FluxVirtualScroller
                    :estimated-item-height="60"
                    :items="messages">
                    <template #default="{item}">
                        <FluxItem>
                            <FluxItemMedia
                                is-center
                                :size="36">
                                <FluxAvatar
                                    :alt="item.from"
                                    :fallback-initials="item.initials"
                                    :size="36"/>
                            </FluxItemMedia>

                            <FluxItemContent is-center>
                                <FluxFlex
                                    align="center"
                                    :gap="6">
                                    <strong>{{ item.from }}</strong>
                                    <FluxSpacer/>
                                    <span style="font-size: .75rem; opacity: .6">{{ item.time }}</span>
                                </FluxFlex>
                                <span style="font-size: .875rem; opacity: .6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ item.subject }}</span>
                            </FluxItemContent>

                            <FluxItemActions is-center>
                                <FluxChip
                                    icon-leading="folder"
                                    :label="item.folder"/>
                            </FluxItemActions>
                        </FluxItem>
                    </template>
                </FluxVirtualScroller>
            </div>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxBadge, FluxChip, FluxFader, FluxFaderItem, FluxFlex, FluxIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane, FluxSpacer, FluxVirtualScroller } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { DateTime } from 'luxon';

    const headlines = [
        'New message from the design team',
        '3 invoices are awaiting your approval',
        'Your weekly digest is ready',
        'Security review completed successfully'
    ];

    const folders = ['Inbox', 'Team', 'Billing', 'Updates'];

    const messages = Array.from({length: 5000}, (_, index) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            id: index,
            from: `${firstName} ${lastName}`,
            initials: `${firstName[0]}${lastName[0]}`,
            subject: faker.lorem.sentence(),
            time: DateTime.now().minus({minutes: index * 3}).toFormat('HH:mm'),
            folder: folders[index % folders.length]
        };
    });
</script>
