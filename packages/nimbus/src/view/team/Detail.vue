<template>
    <FluxApplicationContent
        v-if="member"
        layout="default">
        <FluxGrid>
            <FluxGridColumn
                :lg="8"
                :xs="12">
                <FluxLayerPane>
                    <FluxPaneHeader
                        icon="diagram-project"
                        title="Projects"/>
                    <template v-if="memberProjects.length > 0">
                        <FluxClickablePane
                            v-for="project of memberProjects"
                            :key="project.id"
                            type="route"
                            variant="flat"
                            :to="{name: 'project', params: {id: project.id}}">
                            <FluxItem>
                                <FluxItemMedia
                                    is-center
                                    :size="40">
                                    <FluxBoxedIcon
                                        :color="project.color"
                                        :name="project.icon"
                                        :size="40"/>
                                </FluxItemMedia>
                                <FluxItemContent is-center>
                                    <strong>{{ project.name }}</strong>
                                    <span>{{ project.progress }}% complete</span>
                                </FluxItemContent>
                                <FluxItemActions is-center>
                                    <StatusBadge :meta="PROJECT_STATUS[project.status]"/>
                                </FluxItemActions>
                            </FluxItem>
                        </FluxClickablePane>
                    </template>
                    <FluxPane v-else>
                        <FluxPaneBody>
                            <p class="muted">Not assigned to any projects.</p>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxLayerPane>

                <FluxLayerPane class="block">
                    <FluxPaneHeader
                        icon="stopwatch"
                        title="Logged this week">
                        <template #after>
                            <span class="muted">{{ formatHours(weeklyHours) }}</span>
                        </template>
                    </FluxPaneHeader>
                    <FluxPane>
                        <FluxItemStack v-if="weekEntries.length > 0">
                            <FluxItem
                                v-for="entry of weekEntries"
                                :key="entry.id">
                                <FluxItemMedia
                                    is-center
                                    :size="36">
                                    <FluxBoxedIcon
                                        color="info"
                                        name="clock"
                                        :size="36"/>
                                </FluxItemMedia>
                                <FluxItemContent is-center>
                                    <strong>{{ projectName(entry.projectId) }}</strong>
                                    <span>{{ entry.note }} · {{ entry.date.toFormat('ccc, LLL d') }}</span>
                                </FluxItemContent>
                                <FluxItemActions is-center>
                                    <span class="amount">{{ formatHours(entry.hours) }}</span>
                                </FluxItemActions>
                            </FluxItem>
                        </FluxItemStack>
                        <FluxPaneBody v-else>
                            <p class="muted">No time logged this week.</p>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxLayerPane>
            </FluxGridColumn>

            <FluxGridColumn
                :lg="4"
                :xs="12">
                <FluxLayerPane>
                    <FluxItem class="card-header">
                        <FluxItemMedia
                            is-center
                            :size="54">
                            <MemberAvatar
                                :member="member"
                                :size="54"/>
                        </FluxItemMedia>
                        <FluxItemContent is-center>
                            <strong>{{ member.name }}</strong>
                            <span>{{ member.role }}</span>
                        </FluxItemContent>
                    </FluxItem>

                    <FluxPane>
                        <FluxPaneBody>
                            <FluxDescriptionList>
                                <FluxDescriptionItem
                                    icon="at"
                                    label="Email">
                                    <a
                                        class="link"
                                        :href="`mailto:${member.email}`">{{ member.email }}</a>
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="user"
                                    label="Role">
                                    {{ member.role }}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem
                                    icon="gauge"
                                    label="Capacity">
                                    {{ member.capacity }}h / week
                                </FluxDescriptionItem>
                            </FluxDescriptionList>

                            <div class="budget">
                                <div class="budget-head">
                                    <span>Utilisation</span>
                                    <span class="muted">{{ formatHours(weeklyHours) }} / {{ member.capacity }}h</span>
                                </div>
                                <FluxProgressBar
                                    :color="utilisationColor"
                                    :max="member.capacity"
                                    :value="weeklyHours"/>
                            </div>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxLayerPane>
            </FluxGridColumn>
        </FluxGrid>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBoxedIcon, FluxClickablePane, FluxDescriptionItem, FluxDescriptionList, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxProgressBar } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, watch } from 'vue';
    import { onBeforeRouteLeave, useRoute } from 'vue-router';
    import MemberAvatar from '@/component/MemberAvatar.vue';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { useProjectsStore, useTeamStore, useTimeStore, useUiStore } from '@/store';
    import type { Id } from '@/types';
    import { formatHours, PROJECT_STATUS } from '@/util';

    const route = useRoute();
    const {getMember} = useTeamStore();
    const {projects, getProject} = useProjectsStore();
    const {entriesForMemberWeek, weekTotal} = useTimeStore();
    const {setIcon, setTitle} = useUiStore();

    const weekStart = DateTime.now().startOf('week');

    const member = computed(() => getMember(String(route.params.id)));
    const memberProjects = computed(() => member.value ? projects.value.filter(project => project.memberIds.includes(member.value!.id)) : []);
    const weekEntries = computed(() => member.value ? entriesForMemberWeek(member.value.id, weekStart) : []);
    const weeklyHours = computed(() => member.value ? weekTotal(member.value.id, weekStart) : 0);

    const utilisationColor = computed<FluxColor>(() => {
        if (!member.value) {
            return 'primary';
        }

        const ratio = weeklyHours.value / member.value.capacity;
        return ratio > 1 ? 'danger' : ratio > 0.85 ? 'warning' : 'success';
    });

    function projectName(id: Id): string {
        return getProject(id)?.name ?? 'Unknown project';
    }

    watch(member, current => {
        if (current) {
            setIcon('user');
            setTitle(current.name);
        }
    }, {immediate: true});

    onBeforeRouteLeave(() => {
        setIcon();
        setTitle();
    });
</script>

<style scoped>
    .card-header {
        padding: 15px 18px;
    }

    .block {
        margin-top: 18px;
    }

    .link {
        color: var(--primary-500);
        text-decoration: none;
    }

    .amount {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
    }

    .budget {
        display: flex;
        flex-flow: column;
        gap: 6px;
        margin-top: 18px;
    }

    .budget-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
    }

    .muted {
        margin: 0;
        font-variant-numeric: tabular-nums;
        font-size: 13px;
        color: var(--gray-500);
    }
</style>
