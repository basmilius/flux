<template>
    <div class="task-card">
        <div class="task-card-top">
            <FluxBadge
                :color="TASK_PRIORITY_COLORS[task.priority]"
                :icon="TASK_PRIORITY_ICONS[task.priority]"
                :label="TASK_PRIORITY_LABELS[task.priority]"
                type="none"/>

            <FluxSpacer/>

            <FluxFlyout :width="200">
                <template #opener="{toggle}">
                    <FluxAction
                        icon="ellipsis"
                        @click="toggle()"/>
                </template>

                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="pen"
                            label="Rename"
                            @click="onRename()"/>
                        <FluxMenuItem
                            icon-leading="file-lines"
                            label="Edit description"
                            @click="onEditDescription()"/>
                    </FluxMenuGroup>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete"
                            @click="onDelete()"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxFlyout>
        </div>

        <span class="task-card-title">{{ task.title }}</span>

        <p
            v-if="task.description"
            class="task-card-description">
            {{ task.description }}
        </p>

        <div
            v-if="task.tags.length > 0"
            class="task-card-tags">
            <FluxChip
                v-for="tag of task.tags"
                :key="tag"
                :label="tag"/>
        </div>

        <div class="task-card-footer">
            <span
                v-if="task.dueDate"
                class="task-card-due">
                <FluxIcon name="calendar"/>
                {{ task.dueDate.toFormat('MMM d') }}
            </span>

            <FluxSpacer/>

            <MemberAvatar
                v-if="assignee"
                :member="assignee"
                :size="24"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxChip, FluxFlyout, FluxIcon, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSpacer, showConfirm, showPrompt, showSnackbar } from '@flux-ui/components';
    import { computed } from 'vue';
    import MemberAvatar from '@/component/MemberAvatar.vue';
    import { useProjectsStore, useTeamStore } from '@/store';
    import type { Task } from '@/types';
    import { TASK_PRIORITY_COLORS, TASK_PRIORITY_ICONS, TASK_PRIORITY_LABELS } from '@/util';

    const {task} = defineProps<{
        readonly task: Task;
    }>();

    const {deleteTask, updateTask} = useProjectsStore();
    const {getMember} = useTeamStore();

    const assignee = computed(() => getMember(task.assigneeId));

    async function onRename(): Promise<void> {
        const value = await showPrompt({
            title: 'Rename task',
            message: 'Enter a new title for this task.',
            fieldLabel: 'Title',
            icon: 'pen'
        });

        if (value) {
            updateTask(task.id, {title: value});
        }
    }

    async function onEditDescription(): Promise<void> {
        const value = await showPrompt({
            title: 'Edit description',
            message: 'Describe what needs to happen.',
            fieldLabel: 'Description',
            icon: 'file-lines'
        });

        if (value !== false) {
            updateTask(task.id, {description: value});
        }
    }

    async function onDelete(): Promise<void> {
        const confirmed = await showConfirm({
            title: 'Delete task',
            message: `Delete "${task.title}"? This cannot be undone.`,
            icon: 'trash'
        });

        if (confirmed) {
            deleteTask(task.id);
            await showSnackbar({color: 'success', icon: 'circle-check', message: 'Task deleted.'});
        }
    }
</script>

<style scoped>
    .task-card {
        display: flex;
        flex-flow: column;
        gap: 9px;
        padding: 12px;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .task-card-top {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .task-card-title {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        color: var(--foreground);
    }

    .task-card-description {
        margin: 0;
        font-size: 13px;
        line-height: 1.5;
        color: var(--gray-500);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .task-card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .task-card-footer {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .task-card-due {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--gray-500);
    }
</style>
