<template>
    <FluxApplicationContent
        v-if="project"
        layout="default">
        <FluxApplicationSection>
            <FluxAspectRatio
                :aspect-ratio="32 / 9"
                class="cover">
                <FluxFader :interval="5000">
                    <FluxFaderItem
                        v-for="(image, index) of covers"
                        :key="index">
                        <img
                            alt=""
                            class="cover-image"
                            :src="image"/>
                    </FluxFaderItem>
                </FluxFader>
            </FluxAspectRatio>

            <FluxFlex
                direction="vertical"
                :gap="9">
                <FluxBreadcrumb>
                    <FluxBreadcrumbItem
                        icon="diagram-project"
                        label="Projects"
                        :to="{name: 'projects'}"/>
                    <FluxBreadcrumbItem :label="project.name"/>
                </FluxBreadcrumb>

                <FluxInlineEdit
                    class="project-title"
                    :model-value="project.name"
                    placeholder="Project name"
                    @save="onRename"/>

                <FluxBadgeStack>
                    <StatusBadge :meta="PROJECT_STATUS[project.status]"/>
                    <FluxBadge
                        color="warning"
                        icon="star"
                        :label="`Health ${project.health}/5`"
                        type="none"/>
                </FluxBadgeStack>

                <FluxOverflowBar
                    v-if="project.labels.length > 0"
                    :gap="6">
                    <FluxChip
                        v-for="label of project.labels"
                        :key="label"
                        :label="label"/>

                    <template #overflow="{items}">
                        <FluxChip :label="`+${items.length}`"/>
                    </template>
                </FluxOverflowBar>
            </FluxFlex>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxStatisticsGrid
                :gap="18"
                :md="4"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    icon="list-check"
                    title="Tasks done"
                    :value="`${doneTasks}/${projectTasks.length}`"/>
                <FluxStatisticsKpi
                    icon="gauge-high"
                    title="Progress"
                    :value="`${project.progress}%`"/>
                <FluxStatisticsKpi
                    icon="sack-dollar"
                    title="Budget spent"
                    :value="formatCurrency(project.spent)"/>
                <FluxStatisticsKpi
                    icon="calendar"
                    title="Days left"
                    :value="daysLeft"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxLayerPane>
                            <FluxPaneHeader
                                icon="circle-info"
                                title="About this project"/>
                            <FluxPane>
                                <FluxPaneBody>
                                    <FluxText
                                        color="gray"
                                        size="medium"
                                        tag="p">{{ project.description }}</FluxText>
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxLayerPane>

                        <FluxLayerPane>
                            <FluxPaneHeader
                                icon="list-check"
                                title="Recent tasks">
                                <template #after>
                                    <FluxSecondaryButton
                                        icon-trailing="arrow-right"
                                        label="Board"
                                        type="route"
                                        :to="{name: 'project-board', params: {id: project.id}}"/>
                                </template>
                            </FluxPaneHeader>
                            <FluxPane>
                                <FluxItemStack>
                                    <FluxItem
                                        v-for="task of recentTasks"
                                        :key="task.id">
                                        <FluxItemMedia
                                            is-center
                                            :size="36">
                                            <FluxBoxedIcon
                                                :color="TASK_STATUS_COLORS[task.status]"
                                                :name="TASK_STATUS_ICONS[task.status]"
                                                :size="36"/>
                                        </FluxItemMedia>
                                        <FluxItemContent is-center>
                                            <strong>{{ task.title }}</strong>
                                            <span>{{ TASK_STATUS_LABELS[task.status] }}</span>
                                        </FluxItemContent>
                                        <FluxItemActions is-center>
                                            <FluxBadge
                                                :color="TASK_PRIORITY_COLORS[task.priority]"
                                                :icon="TASK_PRIORITY_ICONS[task.priority]"
                                                :label="TASK_PRIORITY_LABELS[task.priority]"
                                                type="none"/>
                                        </FluxItemActions>
                                    </FluxItem>
                                </FluxItemStack>
                            </FluxPane>
                        </FluxLayerPane>
                    </FluxFlex>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="4"
                    :xs="12">
                    <FluxSticky :offset="84">
                        <FluxFlex
                            direction="vertical"
                            :gap="18">
                            <FluxLayerPane>
                                <FluxPaneMedia
                                    :aspect-ratio="21 / 9"
                                    image-alt="Project cover"
                                    :image-url="cover"/>
                                <FluxPaneHeader
                                    icon="circle-info"
                                    title="Details"/>
                                <FluxPane>
                                    <FluxPaneBody>
                                        <FluxFlex
                                            direction="vertical"
                                            :gap="18">
                                            <FluxDescriptionList>
                                                <FluxDescriptionItem
                                                    icon="handshake"
                                                    label="Client">
                                                    <FluxLink
                                                        v-if="client"
                                                        type="route"
                                                        :to="{name: 'client', params: {id: client.id}}">
                                                        {{ client.name }}
                                                    </FluxLink>
                                                    <span v-else>—</span>
                                                </FluxDescriptionItem>
                                                <FluxDescriptionItem
                                                    icon="bolt"
                                                    label="Status">
                                                    <StatusBadge :meta="PROJECT_STATUS[project.status]"/>
                                                </FluxDescriptionItem>
                                                <FluxDescriptionItem
                                                    icon="calendar"
                                                    label="Started">
                                                    {{ project.startDate.toFormat('LLL d, yyyy') }}
                                                </FluxDescriptionItem>
                                                <FluxDescriptionItem
                                                    icon="flag"
                                                    label="Due">
                                                    {{ project.dueDate.toFormat('LLL d, yyyy') }}
                                                </FluxDescriptionItem>
                                            </FluxDescriptionList>

                                            <FluxFlex
                                                direction="vertical"
                                                :gap="6">
                                                <FluxFlex
                                                    align="center"
                                                    justify="between">
                                                    <FluxText size="small">Budget used</FluxText>
                                                    <FluxText
                                                        color="muted"
                                                        size="small"
                                                        tabular>{{ formatCurrency(project.spent) }} / {{ formatCurrency(project.budget) }}</FluxText>
                                                </FluxFlex>
                                                <FluxProgressBar
                                                    :color="budgetColor"
                                                    :max="project.budget"
                                                    :value="project.spent"/>
                                                <FluxTicks
                                                    :lower="0"
                                                    :upper="100"/>
                                            </FluxFlex>
                                        </FluxFlex>
                                    </FluxPaneBody>
                                </FluxPane>
                                <FluxLayerPaneSecondary>
                                    <FluxPaneBody>
                                        <FluxText
                                            color="muted"
                                            tabular>{{ projectTasks.length }} tasks · {{ team.length }} members</FluxText>
                                    </FluxPaneBody>
                                </FluxLayerPaneSecondary>
                            </FluxLayerPane>

                            <FluxLayerPane>
                                <FluxPaneHeader
                                    icon="user-group"
                                    title="Team"/>
                                <FluxPane>
                                    <FluxItemStack>
                                        <FluxItem
                                            v-for="member of team"
                                            :key="member.id">
                                            <FluxItemMedia
                                                is-center
                                                :size="36">
                                                <MemberAvatar
                                                    :member="member"
                                                    :size="36"/>
                                            </FluxItemMedia>
                                            <FluxItemContent is-center>
                                                <strong>{{ member.name }}</strong>
                                                <span>{{ member.role }}</span>
                                            </FluxItemContent>
                                        </FluxItem>
                                    </FluxItemStack>
                                </FluxPane>
                            </FluxLayerPane>
                        </FluxFlex>
                    </FluxSticky>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxAspectRatio, FluxBadge, FluxBadgeStack, FluxBoxedIcon, FluxBreadcrumb, FluxBreadcrumbItem, FluxChip, FluxDescriptionItem, FluxDescriptionList, FluxFader, FluxFaderItem, FluxFlex, FluxGrid, FluxGridColumn, FluxInlineEdit, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxLayerPaneSecondary, FluxLink, FluxOverflowBar, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneMedia, FluxProgressBar, FluxSecondaryButton, FluxSticky, FluxText, FluxTicks } from '@flux-ui/components';
    import { FluxStatisticsGrid, FluxStatisticsKpi } from '@flux-ui/statistics';
    import type { FluxColor } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import MemberAvatar from '@/component/MemberAvatar.vue';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { useClientsStore, useProjectsStore, useTeamStore } from '@/store';
    import { coverImage, formatCurrency, PROJECT_STATUS, TASK_PRIORITY_COLORS, TASK_PRIORITY_ICONS, TASK_PRIORITY_LABELS, TASK_STATUS_COLORS, TASK_STATUS_ICONS, TASK_STATUS_LABELS } from '@/util';

    const route = useRoute();
    const {getProject, tasksForProject, updateProject} = useProjectsStore();
    const {getClient} = useClientsStore();
    const {membersByIds} = useTeamStore();

    function onRename(value: string): void {
        if (project.value && value.trim()) {
            updateProject(project.value.id, {name: value.trim()});
        }
    }

    const project = computed(() => getProject(String(route.params.id)));
    const client = computed(() => project.value ? getClient(project.value.clientId) : undefined);
    const projectTasks = computed(() => project.value ? tasksForProject(project.value.id) : []);
    const doneTasks = computed(() => projectTasks.value.filter(task => task.status === 'done').length);
    const recentTasks = computed(() => projectTasks.value.slice(0, 6));
    const team = computed(() => project.value ? membersByIds(project.value.memberIds) : []);

    const cover = computed(() => coverImage(project.value?.name ?? 'Project', project.value?.color ?? 'primary'));
    const covers = computed(() => ['primary', 'info', 'success'].map(color => coverImage(project.value?.name ?? 'Project', color)));

    const daysLeft = computed(() => {
        if (!project.value) {
            return '—';
        }

        const days = Math.round(project.value.dueDate.diffNow('days').days);
        return days >= 0 ? `${days}` : 'Overdue';
    });

    const budgetColor = computed<FluxColor>(() => {
        if (!project.value) {
            return 'primary';
        }

        const ratio = project.value.spent / project.value.budget;
        return ratio > 0.9 ? 'danger' : ratio > 0.7 ? 'warning' : 'success';
    });
</script>

<style scoped>
    .project-title {
        font-size: 21px;
        font-weight: 600;
        color: var(--foreground);
    }

    .cover {
        margin-bottom: 15px;
        border-radius: var(--radius);
        overflow: hidden;
    }

    .cover-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
