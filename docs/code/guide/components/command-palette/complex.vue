<template>
    <FluxSecondaryButton
        label="Open command palette"
        @click="commandPalette?.open()"/>

    <FluxCommandPalette
        ref="commandPalette"
        placeholder="What are you looking for?"
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
            label: '',
            items: [
                {
                    id: 'nav-dashboard',
                    label: 'Dashboard',
                    icon: 'grid-2',
                    onActivate: () => activate('Dashboard')
                },
                {
                    id: 'nav-customers',
                    label: 'Customers',
                    icon: 'users',
                    onActivate: () => activate('Customers')
                },
                {
                    id: 'nav-orders',
                    label: 'Orders',
                    icon: 'box',
                    onActivate: () => activate('Orders')
                },
                {
                    id: 'nav-analytics',
                    label: 'Analytics',
                    icon: 'chart-line',
                    onActivate: () => activate('Analytics')
                },
                {
                    id: 'nav-settings',
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
                    subLabel: 'Enterprise \u00b7 New York',
                    icon: 'building',
                    subActions: [
                        {label: 'View details', icon: 'eye', onActivate: () => activate('View Acme Corp')},
                        {label: 'Edit customer', icon: 'pen', onActivate: () => activate('Edit Acme Corp')},
                        {label: 'View orders', icon: 'box', onActivate: () => activate('Orders for Acme Corp')},
                        {label: 'Send message', icon: 'message', onActivate: () => activate('Message Acme Corp')}
                    ],
                    onActivate: () => activate('Acme Corp')
                },
                {
                    id: 'c2',
                    label: 'Globex Inc',
                    subLabel: 'SMB \u00b7 London',
                    icon: 'building',
                    subActions: [
                        {label: 'View details', icon: 'eye', onActivate: () => activate('View Globex Inc')},
                        {label: 'Edit customer', icon: 'pen', onActivate: () => activate('Edit Globex Inc')}
                    ],
                    onActivate: () => activate('Globex Inc')
                },
                {
                    id: 'c3',
                    label: 'Stark Industries',
                    subLabel: 'Enterprise \u00b7 Los Angeles',
                    icon: 'building',
                    onActivate: () => activate('Stark Industries')
                },
                {
                    id: 'c4',
                    label: 'Wayne Enterprises',
                    subLabel: 'Enterprise \u00b7 Gotham',
                    icon: 'building',
                    onActivate: () => activate('Wayne Enterprises')
                },
                {
                    id: 'c5',
                    label: 'Umbrella Corp',
                    subLabel: 'SMB \u00b7 Raccoon City',
                    icon: 'building',
                    onActivate: () => activate('Umbrella Corp')
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
                    label: 'Order #4201',
                    subLabel: 'Acme Corp \u00b7 Processing',
                    icon: 'box',
                    onActivate: () => activate('Order #4201')
                },
                {
                    id: 'o2',
                    label: 'Order #4202',
                    subLabel: 'Globex Inc \u00b7 Shipped',
                    icon: 'truck',
                    onActivate: () => activate('Order #4202')
                },
                {
                    id: 'o3',
                    label: 'Order #4203',
                    subLabel: 'Stark Industries \u00b7 Delivered',
                    icon: 'circle-check',
                    onActivate: () => activate('Order #4203')
                },
                {
                    id: 'o4',
                    label: 'Order #4204',
                    subLabel: 'Wayne Enterprises \u00b7 Processing',
                    icon: 'box',
                    onActivate: () => activate('Order #4204')
                }
            ]
        },
        {
            key: 'actions',
            label: 'Actions',
            icon: 'bolt',
            tab: true,
            items: [
                {
                    id: 'a-theme',
                    label: 'Theme',
                    icon: 'sun',
                    subActions: [
                        {label: 'Light', icon: 'sun', onActivate: () => activate('Theme: Light')},
                        {label: 'Dark', icon: 'moon', onActivate: () => activate('Theme: Dark')},
                        {label: 'System', icon: 'desktop', onActivate: () => activate('Theme: System')}
                    ],
                    onActivate: () => activate('Theme')
                },
                {
                    id: 'a-language',
                    label: 'Language',
                    icon: 'globe',
                    subActions: [
                        {label: 'English', onActivate: () => activate('Language: English')},
                        {label: 'Dutch', onActivate: () => activate('Language: Dutch')},
                        {label: 'German', onActivate: () => activate('Language: German')},
                        {label: 'French', onActivate: () => activate('Language: French')}
                    ],
                    onActivate: () => activate('Language')
                },
                {
                    id: 'a-new-customer',
                    label: 'Create customer',
                    icon: 'user-plus',
                    command: '\u2318N',
                    onActivate: () => activate('Create customer')
                },
                {
                    id: 'a-export',
                    label: 'Export data',
                    icon: 'arrow-up-from-square',
                    subActions: [
                        {label: 'Export as CSV', onActivate: () => activate('Export CSV')},
                        {label: 'Export as Excel', onActivate: () => activate('Export Excel')},
                        {label: 'Export as PDF', onActivate: () => activate('Export PDF')}
                    ],
                    onActivate: () => activate('Export data')
                },
                {
                    id: 'a-copy-url',
                    label: 'Copy current URL',
                    icon: 'copy',
                    command: '\u2318\u21e7C',
                    onActivate: () => activate('Copy current URL')
                },
                {
                    id: 'a-logout',
                    label: 'Log out',
                    icon: 'arrow-right-from-bracket',
                    onActivate: () => activate('Log out')
                }
            ]
        },
        {
            key: 'recent',
            label: 'Recent',
            icon: 'rectangle-history',
            tab: true,
            items: [
                {
                    id: 'r1',
                    label: 'Order #4201',
                    subLabel: 'Viewed 5 minutes ago',
                    icon: 'box',
                    onActivate: () => activate('Order #4201')
                },
                {
                    id: 'r2',
                    label: 'Acme Corp',
                    subLabel: 'Edited 15 minutes ago',
                    icon: 'building',
                    onActivate: () => activate('Acme Corp')
                },
                {
                    id: 'r3',
                    label: 'Analytics',
                    subLabel: 'Viewed 1 hour ago',
                    icon: 'chart-line',
                    onActivate: () => activate('Analytics')
                }
            ]
        }
    ];
</script>
