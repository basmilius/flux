<template>
    <Preview>
        <FluxSecondaryButton
            icon-leading="magnifying-glass"
            label="Open command palette"
            @click="commandPalette?.open()"/>
    </Preview>

    <FluxCommandPalette
        ref="commandPalette"
        :sources="sources"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxCommandSource } from '@flux-ui/types';
    import { FluxCommandPalette, FluxSecondaryButton, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const commandPalette = ref<InstanceType<typeof FluxCommandPalette>>();

    const activate = (label: string) => showSnackbar({
        icon: 'circle-check',
        message: `Activated: ${label}`
    });

    const sources: FluxCommandSource[] = [
        {
            key: 'navigation',
            label: 'Navigation',
            global: true,
            items: [
                {id: 'dashboard', label: 'Dashboard', icon: 'grid-2', onActivate: () => activate('Dashboard')},
                {id: 'settings', label: 'Settings', icon: 'gear', onActivate: () => activate('Settings')},
                {id: 'users', label: 'Users', icon: 'users', onActivate: () => activate('Users')}
            ]
        },
        {
            key: 'actions',
            label: 'Actions',
            icon: 'bolt',
            tab: true,
            items: [
                {id: 'dark-mode', label: 'Toggle dark mode', icon: 'moon', command: '\u2318D', onActivate: () => activate('Toggle dark mode')},
                {id: 'logout', label: 'Log out', icon: 'arrow-right-from-bracket', onActivate: () => activate('Log out')}
            ]
        }
    ];
</script>
