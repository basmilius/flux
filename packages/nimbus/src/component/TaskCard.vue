<template>
    <FluxPane variant="flat">
        <FluxPaneBody>
            <FluxFlex
                direction="vertical"
                :gap="9">
                <FluxFlex
                    align="center"
                    :gap="6">
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
                </FluxFlex>

                <FluxText
                    size="medium"
                    :weight="500">{{ task.title }}</FluxText>

                <FluxText
                    v-if="task.description"
                    class="task-card-description"
                    color="muted"
                    size="small"
                    tag="p">
                    {{ task.description }}
                </FluxText>

                <FluxFlex
                    v-if="task.tags.length > 0"
                    :gap="6"
                    wrap="wrap">
                    <FluxChip
                        v-for="tag of task.tags"
                        :key="tag"
                        :label="tag"/>
                </FluxFlex>

                <FluxFlex
                    align="center"
                    :gap="6">
                    <FluxFlex
                        v-if="task.dueDate"
                        align="center"
                        is-inline
                        :gap="6">
                        <FluxIcon name="calendar"/>
                        <FluxText
                            color="muted"
                            size="small">{{ task.dueDate.toFormat('MMM d') }}</FluxText>
                    </FluxFlex>

                    <FluxSpacer/>

                    <MemberAvatar
                        v-if="assignee"
                        :member="assignee"
                        :size="24"/>
                </FluxFlex>
            </FluxFlex>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxChip, FluxFlex, FluxFlyout, FluxIcon, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxSpacer, FluxText, showConfirm, showPrompt, showSnackbar } from '@flux-ui/components';
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
    .task-card-description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
