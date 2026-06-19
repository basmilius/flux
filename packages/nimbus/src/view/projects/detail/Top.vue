<template>
    <FluxButtonStack>
        <FluxSecondaryButton
            v-if="active !== 'project-board'"
            icon-leading="table-columns"
            label="Open board"
            type="route"
            :to="{name: 'project-board', params: {id}}"/>

        <FluxPrimaryButton
            icon-leading="plus"
            label="Add task"
            @click="onAddTask()"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSecondaryButton, showPrompt, showSnackbar } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useProjectsStore } from '@/store';

    const route = useRoute();
    const router = useRouter();
    const {createTask} = useProjectsStore();

    const id = computed(() => String(route.params.id));
    const active = computed(() => String(route.name ?? ''));

    async function onAddTask(): Promise<void> {
        const title = await showPrompt({
            title: 'New task',
            message: 'What needs to be done?',
            fieldLabel: 'Task title',
            icon: 'plus'
        });

        if (title) {
            createTask(id.value, {title, status: 'todo'});
            await router.push({name: 'project-board', params: {id: id.value}});
            await showSnackbar({color: 'success', icon: 'circle-check', message: 'Task added to the board.'});
        }
    }
</script>
