<template>
    <FluxApplicationContent layout="full">
        <FluxKanban @move="onMove">
            <FluxKanbanColumn
                v-for="column of columns"
                :key="column.status"
                :column-id="column.status"
                :count="tasksByStatus(projectId, column.status).length"
                :label="column.label">
                <template #actions>
                    <FluxAction
                        icon="plus"
                        @click="onAddTask(column.status)"/>
                </template>

                <FluxKanbanItem
                    v-for="task of tasksByStatus(projectId, column.status)"
                    :key="task.id"
                    :column-id="column.status"
                    :item-id="task.id">
                    <TaskCard :task="task"/>
                </FluxKanbanItem>

                <template #empty>
                    <span class="empty">No tasks here yet.</span>
                </template>
            </FluxKanbanColumn>
        </FluxKanban>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxAction, FluxKanban, FluxKanbanColumn, FluxKanbanItem, showPrompt } from '@flux-ui/components';
    import type { FluxKanbanMoveEvent } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import TaskCard from '@/component/TaskCard.vue';
    import { useProjectsStore } from '@/store';
    import type { TaskStatus } from '@/types';
    import { TASK_STATUS_LABELS } from '@/util';

    const route = useRoute();
    const {createTask, moveTask, tasksByStatus} = useProjectsStore();

    const projectId = computed(() => String(route.params.id));

    const columns: { status: TaskStatus; label: string }[] = [
        {status: 'backlog', label: TASK_STATUS_LABELS.backlog},
        {status: 'todo', label: TASK_STATUS_LABELS.todo},
        {status: 'in-progress', label: TASK_STATUS_LABELS['in-progress']},
        {status: 'review', label: TASK_STATUS_LABELS.review},
        {status: 'done', label: TASK_STATUS_LABELS.done}
    ];

    function onMove({itemId, toColumnId, beforeItemId}: FluxKanbanMoveEvent): void {
        moveTask(String(itemId), String(toColumnId) as TaskStatus, beforeItemId === undefined ? undefined : String(beforeItemId));
    }

    async function onAddTask(status: TaskStatus): Promise<void> {
        const title = await showPrompt({
            title: 'New task',
            message: 'What needs to be done?',
            fieldLabel: 'Task title',
            icon: 'plus'
        });

        if (title) {
            createTask(projectId.value, {title, status});
        }
    }
</script>

<style scoped>
    .empty {
        display: block;
        padding: 12px;
        font-size: 13px;
        color: var(--gray-500);
    }
</style>
