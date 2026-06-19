<template>
    <FluxFormInputGroup
        class="search-opener"
        data-tour="search"
        is-secondary
        role="button"
        tabindex="0"
        @click="open()"
        @keydown.enter="open()"
        @keydown.space.prevent="open()">
        <FluxFormInputAddition icon="magnifying-glass"/>

        <FluxFormInput
            is-readonly
            placeholder="Search…"
            style="pointer-events: none"
            tabindex="-1"
            type="search"/>

        <FluxFormInputAddition label="⌘K"/>
    </FluxFormInputGroup>

    <FluxCommandPalette
        ref="palette"
        placeholder="Search projects, clients, people and actions..."
        :sources="sources"/>
</template>

<script
    lang="ts"
    setup>
    import { useHotKey } from '@basmilius/common';
    import { FluxCommandPalette, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, showSnackbar } from '@flux-ui/components';
    import type { FluxCommandSource } from '@flux-ui/types';
    import { computed, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import { resetData, useClientsStore, useProjectsStore, useTeamStore, useUiStore } from '@/store';

    const router = useRouter();
    const {projects} = useProjectsStore();
    const {clients} = useClientsStore();
    const {members} = useTeamStore();
    const {toggleDarkMode} = useUiStore();
    const palette = useTemplateRef<InstanceType<typeof FluxCommandPalette>>('palette');

    function open(): void {
        palette.value?.open();
    }

    // ⌘K on macOS, Ctrl+K elsewhere — `mod` resolves per platform.
    useHotKey('mod+k', () => open(), {preventDefault: true});

    async function onReset(): Promise<void> {
        resetData();
        await showSnackbar({color: 'success', icon: 'circle-check', message: 'Demo data has been reset.'});
    }

    const sources = computed<FluxCommandSource[]>(() => [
        {
            key: 'actions',
            label: 'Quick actions',
            items: [
                {id: 'new-project', label: 'New project', icon: 'circle-plus', onActivate: () => router.push({name: 'project-new'})},
                {id: 'log-time', label: 'Log time', icon: 'stopwatch', onActivate: () => router.push({name: 'timesheets'})},
                {id: 'toggle-dark', label: 'Toggle dark mode', icon: 'moon', onActivate: () => toggleDarkMode()},
                {id: 'reset', label: 'Reset demo data', icon: 'arrows-rotate', onActivate: () => onReset()}
            ]
        },
        {
            key: 'pages',
            label: 'Pages',
            items: [
                {id: 'dashboard', label: 'Dashboard', icon: 'grid-2', onActivate: () => router.push({name: 'dashboard'})},
                {id: 'projects', label: 'Projects', icon: 'diagram-project', onActivate: () => router.push({name: 'projects'})},
                {id: 'clients', label: 'Clients', icon: 'handshake', onActivate: () => router.push({name: 'clients'})},
                {id: 'team', label: 'Team', icon: 'user-group', onActivate: () => router.push({name: 'team'})},
                {id: 'calendar', label: 'Calendar', icon: 'calendar', onActivate: () => router.push({name: 'calendar'})},
                {id: 'timesheets', label: 'Timesheets', icon: 'stopwatch', onActivate: () => router.push({name: 'timesheets'})},
                {id: 'invoices', label: 'Invoices', icon: 'file-invoice-dollar', onActivate: () => router.push({name: 'invoices'})},
                {id: 'deals', label: 'Pipeline', icon: 'sack-dollar', onActivate: () => router.push({name: 'deals'})},
                {id: 'goals', label: 'Goals', icon: 'bullseye', onActivate: () => router.push({name: 'goals'})},
                {id: 'reports', label: 'Reports', icon: 'chart-line', onActivate: () => router.push({name: 'reports'})},
                {id: 'inbox', label: 'Inbox', icon: 'inbox', onActivate: () => router.push({name: 'inbox'})},
                {id: 'activity', label: 'Activity log', icon: 'comments', onActivate: () => router.push({name: 'activity'})},
                {id: 'settings', label: 'Settings', icon: 'gear', onActivate: () => router.push({name: 'settings'})}
            ]
        },
        {
            key: 'projects',
            label: 'Projects',
            tab: true,
            items: projects.value.map(project => ({
                id: project.id,
                label: project.name,
                subLabel: project.key,
                icon: project.icon,
                onActivate: () => router.push({name: 'project', params: {id: project.id}})
            }))
        },
        {
            key: 'clients',
            label: 'Clients',
            tab: true,
            items: clients.value.map(client => ({
                id: client.id,
                label: client.name,
                subLabel: client.industry,
                icon: 'handshake',
                onActivate: () => router.push({name: 'client', params: {id: client.id}})
            }))
        },
        {
            key: 'people',
            label: 'People',
            tab: true,
            items: members.value.map(member => ({
                id: member.id,
                label: member.name,
                subLabel: member.role,
                icon: 'user',
                onActivate: () => router.push({name: 'team-member', params: {id: member.id}})
            }))
        }
    ]);
</script>

<style scoped>
    .search-opener {
        width: 33ch;
        align-self: center;
        cursor: pointer;
    }
</style>
