<template>
    <FluxSecondaryButton
        label="Open command palette"
        @click="commandPalette?.open()"/>

    <FluxCommandPalette
        ref="commandPalette"
        placeholder="Search customers, orders..."
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
                }
            ]
        },
        {
            key: 'customers',
            label: 'Customers',
            icon: 'users',
            tab: true,
            items: [
                {
                    id: 'c1',
                    label: 'Acme Corp',
                    subLabel: 'Enterprise customer',
                    icon: 'building',
                    subActions: [
                        {
                            label: 'View details',
                            icon: 'eye',
                            onActivate: () => activate('View Acme Corp')
                        },
                        {
                            label: 'Edit customer',
                            icon: 'pen',
                            onActivate: () => activate('Edit Acme Corp')
                        },
                        {
                            label: 'View orders',
                            icon: 'box',
                            onActivate: () => activate('View orders for Acme Corp')
                        }
                    ],
                    onActivate: () => activate('Acme Corp')
                },
                {
                    id: 'c2',
                    label: 'Globex Inc',
                    subLabel: 'SMB customer',
                    icon: 'building',
                    onActivate: () => activate('Globex Inc')
                }
            ]
        },
        {
            key: 'orders',
            label: 'Orders',
            icon: 'box',
            tab: true,
            items: [
                {
                    id: 'o1',
                    label: 'Order #1234',
                    subLabel: 'Acme Corp',
                    icon: 'box',
                    onActivate: () => activate('Order #1234')
                },
                {
                    id: 'o2',
                    label: 'Order #1235',
                    subLabel: 'Globex Inc',
                    icon: 'box',
                    onActivate: () => activate('Order #1235')
                }
            ]
        },
        {
            key: 'actions',
            label: 'Actions',
            tab: true,
            global: true,
            items: [
                {
                    id: 'dark-mode',
                    label: 'Toggle dark mode',
                    icon: 'moon',
                    command: '\u2318D',
                    onActivate: () => activate('Toggle dark mode')
                }
            ]
        }
    ];
</script>
