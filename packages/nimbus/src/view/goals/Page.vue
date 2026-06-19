<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection>
            <FluxStatisticsGrid
                :gap="18"
                :sm="3"
                :xs="1">
                <FluxStatisticsKpi
                    icon="gauge-high"
                    title="Average progress"
                    :value="`${averageProgress}%`"/>
                <FluxStatisticsKpi
                    icon="bolt"
                    title="On track"
                    :value="onTrackCount"/>
                <FluxStatisticsKpi
                    icon="triangle-exclamation"
                    title="Needs attention"
                    :value="atRiskCount"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Objectives & key results">
            <div class="toolbar">
                <FluxFilter v-model="filterState">
                    <FluxFilterOptions
                        icon="circle-check"
                        label="Status"
                        name="status"
                        :options="statusFilterOptions"/>
                </FluxFilter>
            </div>

            <FluxGrid>
                <FluxGridColumn
                    v-for="goal of visibleGoals"
                    :key="goal.id"
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="bullseye"
                            :subtitle="`${goal.category} · ${goal.quarter}`"
                            :title="goal.title">
                            <template #after>
                                <StatusBadge :meta="GOAL_STATUS[goal.status]"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPane>
                            <FluxPaneBody>
                                <div class="overall">
                                    <div class="overall-head">
                                        <span>Overall progress</span>
                                        <span class="muted">{{ goal.progress }}%</span>
                                    </div>
                                    <FluxProgressBar
                                        :color="goal.color"
                                        :max="100"
                                        :value="goal.progress"/>
                                </div>

                                <div class="krs">
                                    <button
                                        v-for="(kr, index) of goal.keyResults"
                                        :key="index"
                                        class="kr"
                                        type="button"
                                        @click="editKeyResult(goal.id, index, kr.progress)">
                                        <div class="kr-head">
                                            <span class="kr-label">{{ kr.label }}</span>
                                            <span class="muted">{{ kr.progress }}%</span>
                                        </div>
                                        <FluxProgressBar
                                            :color="krColor(kr.progress)"
                                            :max="100"
                                            :value="kr.progress"/>
                                    </button>
                                </div>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxFilter, FluxFilterOptions, FluxGrid, FluxGridColumn, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxProgressBar, showPrompt } from '@flux-ui/components';
    import { FluxStatisticsGrid, FluxStatisticsKpi } from '@flux-ui/statistics';
    import type { FluxColor, FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import { computed, ref } from 'vue';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { defineTitle } from '@/composable';
    import { useGoalsStore } from '@/store';
    import type { GoalStatus, Id } from '@/types';
    import { GOAL_STATUS } from '@/util';

    defineTitle('bullseye', 'Goals');

    const {goals, averageProgress, updateKeyResult} = useGoalsStore();

    const filterState = ref<FluxFilterState>({status: []});

    const statusFilterOptions: FluxFilterOptionItem[] = (['on-track', 'at-risk', 'off-track', 'completed'] as GoalStatus[])
        .map(status => ({label: GOAL_STATUS[status].label, value: status, icon: GOAL_STATUS[status].icon}));

    const visibleGoals = computed(() => goals.value.filter(goal => {
        const status = filterState.value.status;
        return !Array.isArray(status) || status.length === 0 || status.includes(goal.status);
    }));

    const onTrackCount = computed(() => goals.value.filter(goal => goal.status === 'on-track' || goal.status === 'completed').length);
    const atRiskCount = computed(() => goals.value.filter(goal => goal.status === 'at-risk' || goal.status === 'off-track').length);

    function krColor(progress: number): FluxColor {
        return progress >= 70 ? 'success' : progress >= 40 ? 'warning' : 'danger';
    }

    async function editKeyResult(goalId: Id, index: number, current: number): Promise<void> {
        const value = await showPrompt({
            icon: 'bullseye',
            title: 'Update key result',
            message: 'Set the progress for this key result (0–100).',
            fieldLabel: 'Progress',
            fieldPlaceholder: String(current)
        });

        if (value === false) {
            return;
        }

        const progress = Math.max(0, Math.min(100, Math.round(Number.parseFloat(value))));

        if (Number.isFinite(progress)) {
            updateKeyResult(goalId, index, progress);
        }
    }
</script>

<style scoped>
    .toolbar {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 18px;
    }

    .overall {
        display: flex;
        flex-flow: column;
        gap: 6px;
    }

    .overall-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        font-weight: 500;
    }

    .krs {
        display: flex;
        flex-flow: column;
        gap: 12px;
        margin-top: 18px;
    }

    .kr {
        display: flex;
        flex-flow: column;
        gap: 6px;
        padding: 9px;
        margin: -3px;
        font: inherit;
        text-align: left;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        cursor: pointer;
    }

    .kr:hover {
        border-color: var(--surface-stroke);
        background: var(--surface-hover);
    }

    .kr-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 9px;
        font-size: 13px;
    }

    .kr-label {
        color: var(--foreground);
    }

    .muted {
        font-variant-numeric: tabular-nums;
        color: var(--gray-500);
    }
</style>
