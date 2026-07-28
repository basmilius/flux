<template>
    <FluxPane style="width: min(100%, 480px)">
        <template
            v-for="(task, index) in tasks"
            :key="task.title">
            <FluxSeparator v-if="index > 0"/>

            <FluxSwipeActions>
                <FluxItem style="padding: 18px">
                    <FluxItemContent is-center>
                        <strong :style="task.isCompleted ? 'text-decoration: line-through; opacity: .6' : undefined">{{ task.title }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ task.due }}</span>
                    </FluxItemContent>

                    <FluxItemActions
                        v-if="task.isStarred"
                        is-center>
                        <FluxBadge
                            color="warning"
                            colored
                            icon="star"
                            label="Starred"/>
                    </FluxItemActions>
                </FluxItem>

                <template #start>
                    <FluxSwipeAction
                        is-primary
                        color="success"
                        icon="check"
                        label="Complete"
                        @click="task.isCompleted = !task.isCompleted"/>
                </template>

                <template #end>
                    <FluxSwipeAction
                        color="warning"
                        icon="star"
                        label="Star"
                        @click="task.isStarred = !task.isStarred"/>

                    <FluxSwipeAction
                        is-primary
                        color="danger"
                        icon="trash"
                        label="Delete"
                        @click="tasks.splice(index, 1)"/>
                </template>
            </FluxSwipeActions>
        </template>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxItem, FluxItemActions, FluxItemContent, FluxPane, FluxSeparator, FluxSwipeAction, FluxSwipeActions } from '@flux-ui/components';
    import { reactive } from 'vue';

    const tasks = reactive([
        {title: 'Review the release notes', due: 'Today', isCompleted: false, isStarred: false},
        {title: 'Update the design tokens', due: 'Tomorrow', isCompleted: false, isStarred: true},
        {title: 'Archive last quarter', due: 'Next week', isCompleted: false, isStarred: false}
    ]);
</script>
