<template>
    <FluxPane>
        <FluxDataTable
            :items="members"
            :limits="[]"
            :page="1"
            :per-page="members.length"
            :total="members.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Member</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                <FluxTableHeader :width="180">Onboarding</FluxTableHeader>
                <FluxTableHeader is-shrinking/>
            </template>

            <template #member="{item}">
                <FluxTableCell>
                    <FluxFlex :gap="15">
                        <FluxAvatar
                            :alt="item.name"
                            :fallback-initials="item.initials"
                            :size="36"/>

                        <FluxFlex
                            direction="vertical"
                            :gap="0">
                            <strong>{{ item.name }}</strong>
                            <small>{{ item.email }}</small>
                        </FluxFlex>
                    </FluxFlex>
                </FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <FluxBadgeStack>
                        <FluxBadge
                            v-if="item.isActive"
                            color="success"
                            icon="circle-check"
                            label="Active"/>

                        <FluxBadge
                            v-else
                            color="gray"
                            icon="circle-xmark"
                            label="Invited"/>
                    </FluxBadgeStack>
                </FluxTableCell>
            </template>

            <template #onboarding="{item}">
                <FluxTableCell>
                    <FluxProgressBar
                        :status="item.step"
                        :value="item.onboarding"/>
                </FluxTableCell>
            </template>

            <template #actions="{item}">
                <FluxTableCell>
                    <FluxTableActions>
                        <FluxFlyout>
                            <template #opener="{open}">
                                <FluxAction
                                    icon="ellipsis-h"
                                    @click="open()"/>
                            </template>

                            <FluxMenu style="width: 180px">
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="eye"
                                        label="View profile"
                                        @click="onAction('view', item)"/>

                                    <FluxMenuItem
                                        icon-leading="pen"
                                        label="Edit"
                                        @click="onAction('edit', item)"/>
                                </FluxMenuGroup>

                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="trash"
                                        is-destructive
                                        label="Remove"
                                        @click="onAction('remove', item)"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxFlyout>
                    </FluxTableActions>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxAvatar, FluxBadge, FluxBadgeStack, FluxDataTable, FluxFlex, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxProgressBar, FluxSeparator, FluxTableActions, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Member = {
        readonly id: number;
        readonly name: string;
        readonly initials: string;
        readonly email: string;
        readonly isActive: boolean;
        readonly step: string;
        readonly onboarding: number;
    };

    const members: Member[] = [
        {id: 1, name: 'Ada Lovelace', initials: 'AL', email: 'ada@example.com', isActive: true, step: 'Complete', onboarding: 1},
        {id: 2, name: 'Alan Turing', initials: 'AT', email: 'alan@example.com', isActive: true, step: 'Training', onboarding: 0.75},
        {id: 3, name: 'Grace Hopper', initials: 'GH', email: 'grace@example.com', isActive: false, step: 'Profile setup', onboarding: 0.3},
        {id: 4, name: 'Margaret Hamilton', initials: 'MH', email: 'margaret@example.com', isActive: true, step: 'Verification', onboarding: 0.55}
    ];

    function onAction(action: 'view' | 'edit' | 'remove', member: Member): void {
        console.log(action, member.name);
    }
</script>
