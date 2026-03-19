<template>
    <FluxSecondaryButton
        label="Open command palette"
        @click="commandPalette?.open()"/>

    <FluxCommandPalette
        ref="commandPalette"
        placeholder="Search customers, pages..."
        :sources="sources"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxCommandSource, FluxCommandSourceItem } from '@flux-ui/types';
    import { FluxCommandPalette, FluxSecondaryButton, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const commandPalette = ref<InstanceType<typeof FluxCommandPalette>>();

    const activate = (label: string) => showSnackbar({
        icon: 'circle-check',
        message: `Activated: ${label}`
    });

    const customers = [
        {id: 1, name: 'Acme Corp', segment: 'Enterprise · New York'},
        {id: 2, name: 'Globex Inc', segment: 'SMB · London'},
        {id: 3, name: 'Stark Industries', segment: 'Enterprise · Los Angeles'},
        {id: 4, name: 'Wayne Enterprises', segment: 'Enterprise · Gotham'},
        {id: 5, name: 'Umbrella Corp', segment: 'SMB · Raccoon City'},
        {id: 6, name: 'Initech', segment: 'SMB · Austin'},
        {id: 7, name: 'Hooli', segment: 'Enterprise · Palo Alto'},
        {id: 8, name: 'Pied Piper', segment: 'Startup · Palo Alto'},
        {id: 9, name: 'Dunder Mifflin', segment: 'SMB · Scranton'},
        {id: 10, name: 'Sterling Cooper', segment: 'SMB · New York'}
    ];

    const sources: FluxCommandSource[] = [
        {
            key: 'navigation',
            label: 'Navigation',
            items: [
                {id: 'dashboard', label: 'Dashboard', icon: 'grid-2', onActivate: () => activate('Dashboard')},
                {id: 'customers', label: 'Customers', icon: 'users', onActivate: () => activate('Customers')},
                {id: 'settings', label: 'Settings', icon: 'gear', onActivate: () => activate('Settings')}
            ]
        },
        {
            key: 'customers',
            label: 'Customers',
            icon: 'users',
            tab: true,
            items: [
                {id: 'c1', label: 'Acme Corp', subLabel: 'Enterprise · New York', icon: 'building', onActivate: () => activate('Acme Corp')},
                {id: 'c2', label: 'Globex Inc', subLabel: 'SMB · London', icon: 'building', onActivate: () => activate('Globex Inc')},
                {id: 'c3', label: 'Stark Industries', subLabel: 'Enterprise · Los Angeles', icon: 'building', onActivate: () => activate('Stark Industries')}
            ],
            fetchSearch: async (query: string): Promise<FluxCommandSourceItem[]> => {
                await new Promise(resolve => setTimeout(resolve, 1000));

                return customers
                    .filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.segment.toLowerCase().includes(query.toLowerCase()))
                    .map(c => ({
                        id: `c${c.id}`,
                        label: c.name,
                        subLabel: c.segment,
                        icon: 'building',
                        onActivate: () => activate(c.name)
                    }));
            }
        }
    ];
</script>
