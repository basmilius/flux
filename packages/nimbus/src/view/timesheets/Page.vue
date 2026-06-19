<template>
    <FluxApplicationContent layout="default">
        <FluxApplicationSection>
            <FluxStatisticsGrid
                :gap="18"
                :sm="3"
                :xs="1">
                <FluxStatisticsKpi
                    icon="stopwatch"
                    title="Logged this week"
                    :value="formatHours(loggedHours)"/>
                <FluxStatisticsKpi
                    icon="circle-check"
                    title="Billable"
                    :value="formatHours(billableHours)"/>
                <FluxStatisticsKpi
                    icon="gauge"
                    title="Capacity"
                    :value="`${member?.capacity ?? 40}h`"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxLayerPane>
                <FluxPaneHeader
                    icon="calendar-range"
                    :title="weekLabel">
                    <template #after>
                        <FluxButtonGroup>
                            <FluxSecondaryButton
                                icon-leading="angle-left"
                                @click="weekOffset--"/>
                            <FluxSecondaryButton
                                label="Today"
                                @click="weekOffset = 0"/>
                            <FluxSecondaryButton
                                icon-leading="angle-right"
                                @click="weekOffset++"/>
                        </FluxButtonGroup>
                    </template>
                </FluxPaneHeader>

                <FluxPane>
                    <FluxTable
                        v-if="weekProjects.length > 0"
                        is-hoverable>
                        <template #header>
                            <FluxTableHeader>Project</FluxTableHeader>
                            <FluxTableHeader
                                v-for="day of days"
                                :key="day.toISODate() ?? ''"
                                is-shrinking>
                                {{ day.toFormat('ccc d') }}
                            </FluxTableHeader>
                            <FluxTableHeader is-shrinking>Total</FluxTableHeader>
                        </template>

                        <FluxTableRow
                            v-for="project of weekProjects"
                            :key="project.id">
                            <FluxTableCell>
                                <div class="project">
                                    <FluxBoxedIcon
                                        :color="project.color"
                                        :name="project.icon"
                                        :size="27"/>
                                    <span>{{ project.name }}</span>
                                </div>
                            </FluxTableCell>
                            <FluxTableCell
                                v-for="day of days"
                                :key="day.toISODate() ?? ''">
                                <button
                                    class="cell"
                                    type="button"
                                    @click="logTime(project.id, day)">
                                    {{ cellLabel(project.id, day) }}
                                </button>
                            </FluxTableCell>
                            <FluxTableCell>
                                <strong>{{ formatHours(rowTotal(project.id)) }}</strong>
                            </FluxTableCell>
                        </FluxTableRow>

                        <FluxTableRow>
                            <FluxTableCell><strong>Total</strong></FluxTableCell>
                            <FluxTableCell
                                v-for="day of days"
                                :key="day.toISODate() ?? ''">
                                <strong>{{ formatHours(dayTotal(day)) }}</strong>
                            </FluxTableCell>
                            <FluxTableCell>
                                <strong>{{ formatHours(loggedHours) }}</strong>
                            </FluxTableCell>
                        </FluxTableRow>
                    </FluxTable>

                    <FluxPaneBody v-else>
                        <FluxPlaceholder
                            icon="stopwatch"
                            message="No time logged for this week yet. Use “Log time” to add an entry."
                            title="Nothing logged"
                            variant="small"/>
                    </FluxPaneBody>
                </FluxPane>
            </FluxLayerPane>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxBoxedIcon, FluxButtonGroup, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPlaceholder, FluxSecondaryButton, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, showPrompt } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { computed, ref } from 'vue';
    import { defineTitle } from '@/composable';
    import { useProjectsStore, useTeamStore, useTimeStore } from '@/store';
    import type { Id } from '@/types';
    import { formatHours } from '@/util';

    defineTitle('stopwatch', 'Timesheets');

    const {members} = useTeamStore();
    const {getProject} = useProjectsStore();
    const {addEntry, billableTotal, hoursFor, projectsForMemberWeek, weekTotal} = useTimeStore();

    const weekOffset = ref(0);
    const member = computed(() => members.value[0]);
    const memberId = computed(() => member.value?.id ?? '');

    const weekStart = computed(() => DateTime.now().startOf('week').plus({weeks: weekOffset.value}));
    const days = computed(() => Array.from({length: 5}, (_, index) => weekStart.value.plus({days: index})));
    const weekLabel = computed(() => `${weekStart.value.toFormat('LLL d')} – ${weekStart.value.plus({days: 4}).toFormat('LLL d, yyyy')}`);

    const weekProjects = computed(() => projectsForMemberWeek(memberId.value, weekStart.value)
        .map(id => getProject(id))
        .filter((project): project is NonNullable<typeof project> => project !== undefined));

    const loggedHours = computed(() => weekTotal(memberId.value, weekStart.value));
    const billableHours = computed(() => billableTotal(memberId.value, weekStart.value));

    function cellLabel(projectId: Id, day: DateTime): string {
        const hours = hoursFor(memberId.value, projectId, day, weekStart.value);
        return hours > 0 ? formatHours(hours) : '·';
    }

    function rowTotal(projectId: Id): number {
        return days.value.reduce((sum, day) => sum + hoursFor(memberId.value, projectId, day, weekStart.value), 0);
    }

    function dayTotal(day: DateTime): number {
        return weekProjects.value.reduce((sum, project) => sum + hoursFor(memberId.value, project.id, day, weekStart.value), 0);
    }

    async function logTime(projectId: Id, day: DateTime): Promise<void> {
        const value = await showPrompt({
            icon: 'stopwatch',
            title: 'Log time',
            message: `How many hours did you work on ${getProject(projectId)?.name ?? 'this project'} on ${day.toFormat('cccc, LLL d')}?`,
            fieldLabel: 'Hours',
            fieldPlaceholder: 'E.g. 2.5'
        });

        if (value === false) {
            return;
        }

        const hours = Number.parseFloat(value);

        if (Number.isFinite(hours) && hours > 0) {
            addEntry({memberId: memberId.value, projectId, taskId: null, date: day, hours, note: 'Logged', billable: true});
        }
    }
</script>

<style scoped>
    .project {
        display: flex;
        align-items: center;
        gap: 9px;
        white-space: nowrap;
    }

    .cell {
        min-width: 39px;
        padding: 3px 6px;
        font: inherit;
        font-variant-numeric: tabular-nums;
        color: var(--foreground);
        background: transparent;
        border: 1px solid transparent;
        border-radius: 6px;
        cursor: pointer;
    }

    .cell:hover {
        border-color: var(--surface-stroke);
        background: var(--surface-hover);
    }
</style>
