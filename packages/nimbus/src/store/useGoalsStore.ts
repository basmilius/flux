import { computed } from 'vue';
import type { Goal, Id } from '@/types';
import { db } from './state';

export function useGoalsStore() {
    const goals = computed(() => db.goals);

    function getGoal(id: Id): Goal | undefined {
        return db.goals.find(goal => goal.id === id);
    }

    function updateKeyResult(goalId: Id, index: number, progress: number): void {
        const goal = getGoal(goalId);

        if (!goal || !goal.keyResults[index]) {
            return;
        }

        goal.keyResults[index].progress = progress;
        goal.progress = Math.round(goal.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / goal.keyResults.length);
        goal.status = goal.progress >= 100 ? 'completed' : goal.progress >= 65 ? 'on-track' : goal.progress >= 40 ? 'at-risk' : 'off-track';
    }

    const averageProgress = computed(() => {
        if (db.goals.length === 0) {
            return 0;
        }

        return Math.round(db.goals.reduce((sum, goal) => sum + goal.progress, 0) / db.goals.length);
    });

    return {
        averageProgress,
        goals,
        getGoal,
        updateKeyResult
    };
}
