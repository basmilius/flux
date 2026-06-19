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
                            <div class="stats">
                                <div class="stat">
                                    <span class="stat-value">{{ projectCount(member.id) }}</span>
                                    <span class="stat-label">Projects</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">{{ formatHours(weekTotal(member.id, weekStart)) }}</span>
                                    <span class="stat-label">This week</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">{{ member.capacity }}h</span>
                                    <span class="stat-label">Capacity</span>
                                </div>
                            </div>
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
    import { FluxBadge, FluxButtonStack, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton } from '@flux-ui/components';
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

    .stats {
        display: flex;
        justify-content: space-between;
        gap: 9px;
    }

    .stat {
        display: flex;
        flex-flow: column;
        gap: 3px;
        text-align: center;
    }

    .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--foreground);
    }

    .stat-label {
        font-size: 12px;
        color: var(--gray-500);
    }
</style>
