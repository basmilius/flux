<template>
    <FluxSecondaryButton
        label="Open command palette"
        @click="commandPalette?.open()"/>

    <FluxCommandPalette
        ref="commandPalette"
        :sources="sources"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxCommandPalette, FluxSecondaryButton, showSnackbar } from '@flux-ui/components';
    import type { FluxCommandSource } from '@flux-ui/types';
    import { useTemplateRef } from 'vue';

    const sources: FluxCommandSource[] = [
        {
            key: 'navigation',
            label: '',
            items: [
                {
                    id: 'dashboard',
                    label: 'Dashboard',
                    icon: 'grid-2',
                    onActivate: () => activate('Dashboard')
                },
                {
                    id: 'settings',
                    label: 'Settings',
                    icon: 'gear',
                    onActivate: () => activate('Settings')
                },
                {
                    id: 'users',
                    label: 'Users',
                    icon: 'users',
                    onActivate: () => activate('Users')
                }
            ]
        },
        {
            key: 'actions',
            label: 'Actions',
            tab: true,
            items: [
                {
                    id: 'dark-mode',
                    label: 'Toggle dark mode',
                    icon: 'moon',
                    command: '\u2318D',
                    onActivate: () => activate('Toggle dark mode')
                },
                {
                    id: 'logout',
                    label: 'Log out',
                    icon: 'arrow-right-from-bracket',
                    onActivate: () => activate('Log out')
                }
            ]
        }
    ];

    const commandPalette = useTemplateRef<InstanceType<typeof FluxCommandPalette>>('commandPalette');

    function activate(label: string): void {
        showSnackbar({
            icon: 'circle-check',
            message: `Activated: ${label}`
        });
    }
</script>
