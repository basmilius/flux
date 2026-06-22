<template>
    <FluxFormInputGroup
        class="opener"
        is-secondary
        role="button"
        tabindex="0"
        @click="open()"
        @keydown.enter="open()"
        @keydown.space.prevent="open()">
        <FluxFormInputAddition icon="magnifying-glass"/>

        <FluxFormInput
            is-readonly
            placeholder="Search reports, pages, actions…"
            style="pointer-events: none"
            tabindex="-1"
            type="search"/>

        <FluxFormInputAddition label="⌘K"/>
    </FluxFormInputGroup>

    <FluxCommandPalette
        ref="palette"
        placeholder="Search reports, pages and actions…"
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
    import { resetData, useAnalyticsStore, useUiStore } from '@/store';

    const router = useRouter();
    const {pages} = useAnalyticsStore();
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
                {id: 'toggle-dark', label: 'Toggle dark mode', icon: 'moon', onActivate: () => toggleDarkMode()},
                {id: 'export', label: 'Export current report', icon: 'download', onActivate: () => showSnackbar({icon: 'download', message: 'Export is not available in this demo.'})},
                {id: 'reset', label: 'Reset demo data', icon: 'arrows-rotate', onActivate: () => onReset()}
            ]
        },
        {
            key: 'reports',
            label: 'Reports',
            items: [
                {id: 'overview', label: 'Overview', icon: 'grid-2', onActivate: () => router.push({name: 'overview'})},
                {id: 'realtime', label: 'Realtime', icon: 'bolt', onActivate: () => router.push({name: 'realtime'})},
                {id: 'audience', label: 'Audience', icon: 'users', onActivate: () => router.push({name: 'audience'})},
                {id: 'acquisition', label: 'Acquisition', icon: 'share-nodes', onActivate: () => router.push({name: 'acquisition'})},
                {id: 'behavior', label: 'Behavior', icon: 'arrow-pointer', onActivate: () => router.push({name: 'behavior'})},
                {id: 'conversions', label: 'Conversions', icon: 'bullseye', onActivate: () => router.push({name: 'conversions'})},
                {id: 'explorer', label: 'Explorer', icon: 'table-cells', onActivate: () => router.push({name: 'reports'})},
                {id: 'settings', label: 'Settings', icon: 'gear', onActivate: () => router.push({name: 'settings'})}
            ]
        },
        {
            key: 'pages',
            label: 'Pages',
            tab: true,
            items: pages.value.map(page => ({
                id: page.id,
                label: page.title,
                subLabel: page.path,
                icon: 'file-lines',
                onActivate: () => router.push({name: 'behavior'})
            }))
        }
    ]);
</script>

<style scoped>
    .opener {
        width: 33ch;
        align-self: center;
        cursor: pointer;
    }
</style>
