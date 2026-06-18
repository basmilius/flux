<template>
    <Preview>
        <FluxPane style="width: 100%; height: 540px; overflow: hidden">
            <FluxSplitView style="height: 100%">
                <FluxSplitViewPane
                    :default-size="345"
                    :min-size="276">
                    <FluxFlex
                        direction="vertical"
                        :gap="0"
                        style="height: 100%">
                        <FluxFlex
                            direction="vertical"
                            :gap="12"
                            style="padding: 15px 15px 12px; background: var(--surface)">
                            <FluxSegmentedControl
                                v-model="view"
                                is-fill>
                                <FluxSegmentedControlItem
                                    value="all"
                                    label="All"/>

                                <FluxSegmentedControlItem
                                    value="unread"
                                    label="Unread"/>

                                <FluxSegmentedControlItem
                                    value="starred"
                                    label="Starred"/>
                            </FluxSegmentedControl>

                            <FluxFilterBar
                                v-model="filterState"
                                v-model:search="search"
                                is-searchable
                                search-placeholder="Search messages...">
                                <FluxFilterOption
                                    icon="folder"
                                    label="Folder"
                                    name="folder"
                                    :options="[
                                        {label: 'Inbox', value: 'inbox'},
                                        {label: 'Sent', value: 'sent'},
                                        {label: 'Archive', value: 'archive'}
                                    ]"/>
                            </FluxFilterBar>
                        </FluxFlex>

                        <FluxScroller
                            has-fade
                            style="flex-grow: 1">
                            <FluxItemStack>
                                <FluxClickablePane
                                    v-for="message in messages"
                                    :key="message.id"
                                    type="button"
                                    variant="flat"
                                    @click="selectedId = message.id">
                                    <FluxItem>
                                        <FluxItemMedia
                                            is-center
                                            :size="42">
                                            <FluxAvatar
                                                :alt="message.from"
                                                :fallback-initials="message.initials"
                                                :size="42"
                                                :status="message.online ? 'success' : undefined"/>
                                        </FluxItemMedia>

                                        <FluxItemContent is-center>
                                            <FluxFlex
                                                align="center"
                                                :gap="6">
                                                <strong>{{ message.from }}</strong>
                                                <FluxBadge
                                                    v-if="message.unread"
                                                    color="primary"
                                                    dot
                                                    label="Unread"/>
                                                <FluxSpacer/>
                                                <span style="font-size: .75rem; opacity: .6">{{ message.time }}</span>
                                            </FluxFlex>
                                            <span style="font-size: .875rem; opacity: .6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ message.subject }}</span>
                                            <FluxFlex
                                                :gap="6"
                                                style="margin-top: 3px">
                                                <FluxChip
                                                    :icon-leading="message.labelIcon"
                                                    :label="message.label"/>
                                            </FluxFlex>
                                        </FluxItemContent>

                                        <FluxItemActions is-center>
                                            <FluxIcon
                                                :name="message.starred ? 'star' : 'circle'"
                                                :style="{opacity: message.starred ? 1 : .25, color: message.starred ? 'var(--warning-500)' : undefined}"/>
                                        </FluxItemActions>
                                    </FluxItem>
                                </FluxClickablePane>
                            </FluxItemStack>
                        </FluxScroller>
                    </FluxFlex>
                </FluxSplitViewPane>

                <FluxSplitViewPane>
                    <FluxFlex
                        direction="vertical"
                        :gap="0"
                        style="height: 100%">
                        <FluxFlex
                            align="center"
                            :gap="12"
                            style="padding: 15px 18px; background: var(--surface)">
                            <FluxAvatar
                                :alt="selected.from"
                                :fallback-initials="selected.initials"
                                :size="36"
                                :status="selected.online ? 'success' : undefined"/>

                            <FluxFlex
                                direction="vertical"
                                :gap="0">
                                <strong>{{ selected.from }}</strong>
                                <span style="font-size: .75rem; opacity: .6">{{ selected.subject }}</span>
                            </FluxFlex>

                            <FluxSpacer/>

                            <FluxSecondaryButton
                                icon-leading="arrow-right-arrow-left"
                                label="Reply"/>

                            <FluxSecondaryButton
                                icon-leading="trash"
                                aria-label="Delete"/>
                        </FluxFlex>

                        <FluxScroller
                            has-fade
                            style="flex-grow: 1; padding: 18px">
                            <FluxFlex
                                direction="vertical"
                                :gap="18">
                                <FluxComment
                                    :avatar-alt="selected.from"
                                    :avatar-fallback-initials="selected.initials"
                                    :posted-by="selected.from"
                                    :posted-on="receivedOn"
                                    is-received>
                                    {{ body }}
                                </FluxComment>

                                <FluxComment
                                    avatar-fallback-icon="user"
                                    posted-by="You"
                                    :posted-on="repliedOn">
                                    {{ reply }}
                                </FluxComment>
                            </FluxFlex>
                        </FluxScroller>
                    </FluxFlex>
                </FluxSplitViewPane>
            </FluxSplitView>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterState, FluxIconName } from '@flux-ui/types';
    import { FluxAvatar, FluxBadge, FluxChip, FluxClickablePane, FluxComment, FluxFilterBar, FluxFilterOption, FluxFlex, FluxIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxScroller, FluxSecondaryButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxSpacer, FluxSplitView, FluxSplitViewPane } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { DateTime } from 'luxon';
    import { computed, ref } from 'vue';

    const view = ref('all');
    const search = ref('');

    const filterState = ref<FluxFilterState>({
        folder: null
    });

    const labels: { label: string; icon: FluxIconName }[] = [
        {label: 'Updates', icon: 'bell'},
        {label: 'Team', icon: 'users'},
        {label: 'Billing', icon: 'coin'},
        {label: 'Security', icon: 'lock'}
    ];

    const messages = Array.from({length: 8}, (_, index) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const tag = labels[index % labels.length];

        return {
            id: index,
            from: `${firstName} ${lastName}`,
            initials: `${firstName[0]}${lastName[0]}`,
            subject: faker.lorem.sentence(),
            time: DateTime.now().minus({minutes: index * 17}).toFormat('HH:mm'),
            label: tag.label,
            labelIcon: tag.icon,
            unread: index < 3,
            starred: index === 1,
            online: index % 3 === 0
        };
    });

    const selectedId = ref(0);
    const selected = computed(() => messages.find(message => message.id === selectedId.value) ?? messages[0]);

    const body = faker.lorem.sentences(3);
    const reply = faker.lorem.sentences(2);

    const receivedOn = DateTime.now().minus({minutes: 24});
    const repliedOn = DateTime.now().minus({minutes: 8});
</script>
