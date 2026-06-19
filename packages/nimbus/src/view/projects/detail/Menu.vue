<template>
    <FluxApplicationMenuContext
        :entry-to="{name: 'project', params: {id}}"
        icon="diagram-project"
        :subtitle="client?.name"
        :title="project?.name ?? 'Project'"/>

    <FluxMenuTitle title="Sections"/>

    <FluxMenuGroup>
        <FluxMenuItem
            icon-leading="grid-2"
            :is-active="active === 'project'"
            label="Overview"
            type="route"
            :to="{name: 'project', params: {id}}"/>

        <FluxMenuItem
            icon-leading="table-columns"
            :is-active="active === 'project-board'"
            label="Board"
            type="route"
            :to="{name: 'project-board', params: {id}}"/>

        <FluxMenuItem
            icon-leading="folder"
            :is-active="active === 'project-files'"
            label="Files"
            type="route"
            :to="{name: 'project-files', params: {id}}"/>

        <FluxMenuItem
            icon-leading="calendar"
            :is-active="active === 'project-calendar'"
            label="Calendar"
            type="route"
            :to="{name: 'project-calendar', params: {id}}"/>

        <FluxMenuItem
            icon-leading="comments"
            :is-active="active === 'project-activity'"
            label="Activity"
            type="route"
            :to="{name: 'project-activity', params: {id}}"/>

        <FluxMenuItem
            icon-leading="gear"
            :is-active="active === 'project-settings'"
            label="Settings"
            type="route"
            :to="{name: 'project-settings', params: {id}}"/>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationMenuContext } from '@flux-ui/application';
    import { FluxMenuGroup, FluxMenuItem, FluxMenuTitle } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useClientsStore, useProjectsStore } from '@/store';

    const route = useRoute();
    const {getProject} = useProjectsStore();
    const {getClient} = useClientsStore();

    const id = computed(() => String(route.params.id));
    const active = computed(() => String(route.name ?? ''));
    const project = computed(() => getProject(id.value));
    const client = computed(() => project.value ? getClient(project.value.clientId) : undefined);
</script>
