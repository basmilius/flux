<template>
    <FluxApplicationContent layout="default">
        <FluxGrid>
            <FluxGridColumn
                v-for="member of members"
                :key="member.id"
                :lg="4"
                :sm="6"
                :xl="3"
                :xs="12">
                <FluxLayerPane>
                    <FluxItem class="card-header">
                        <FluxItemMedia
                            is-center
                            :size="48">
                            <MemberAvatar
                                :member="member"
                                :size="48"/>
                        </FluxItemMedia>
                        <FluxItemContent is-center>
                            <strong>{{ member.name }}</strong>
                            <span>{{ member.role }}</span>
                        </FluxItemContent>
                        <FluxItemActions is-center>
                            <FluxBadge
                                :color="PRESENCE_COLOR[member.presence]"
                                :label="PRESENCE_LABEL[member.presence]"
                                type="none"/>
                        </FluxItemActions>
                    </FluxItem>

                    <FluxPane>
                        <FluxPaneBody>
                            <FluxFlex
                                :gap="9"
                                justify="between">
                                <FluxFlex
                                    align="center"
                                    direction="vertical"
                                    :gap="3">
                                    <FluxText
                                        size="large"
                                        :weight="600">{{ projectCount(member.id) }}</FluxText>
                                    <FluxText
                                        color="muted"
                                        size="small">Projects</FluxText>
                                </FluxFlex>
                                <FluxFlex
                                    align="center"
                                    direction="vertical"
                                    :gap="3">
                                    <FluxText
                                        size="large"
                                        :weight="600">{{ formatHours(weekTotal(member.id, weekStart)) }}</FluxText>
                                    <FluxText
                                        color="muted"
                                        size="small">This week</FluxText>
                                </FluxFlex>
                                <FluxFlex
                                    align="center"
                                    direction="vertical"
                                    :gap="3">
                                    <FluxText
                                        size="large"
                                        :weight="600">{{ member.capacity }}h</FluxText>
                                    <FluxText
                                        color="muted"
                                        size="small">Capacity</FluxText>
                                </FluxFlex>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>

                    <FluxPaneFooter>
                        <FluxButtonStack>
                            <FluxSecondaryButton
                                icon-trailing="arrow-right"
                                label="View profile"
                                type="route"
                                :to="{name: 'team-member', params: {id: member.id}}"/>
                        </FluxButtonStack>
                    </FluxPaneFooter>
                </FluxLayerPane>
            </FluxGridColumn>
        </FluxGrid>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBadge, FluxButtonStack, FluxFlex, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton, FluxText } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import MemberAvatar from '@/component/MemberAvatar.vue';
    import { defineTitle } from '@/composable';
    import { useProjectsStore, useTeamStore, useTimeStore } from '@/store';
    import type { Id, MemberPresence } from '@/types';
    import { formatHours } from '@/util';

    const PRESENCE_LABEL: Record<MemberPresence, string> = {
        online: 'Online',
        away: 'Away',
        offline: 'Offline'
    };

    const PRESENCE_COLOR: Record<MemberPresence, FluxColor> = {
        online: 'success',
        away: 'warning',
        offline: 'gray'
    };

    defineTitle('user-group', 'Team');

    const {members} = useTeamStore();
    const {projects} = useProjectsStore();
    const {weekTotal} = useTimeStore();

    const weekStart = DateTime.now().startOf('week');

    function projectCount(memberId: Id): number {
        return projects.value.filter(project => project.memberIds.includes(memberId)).length;
    }
</script>

<style scoped>
    .card-header {
        padding: 15px 18px;
    }
</style>
