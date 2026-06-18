<template>
    <Preview>
        <FluxPane style="width: 100%; max-width: 540px">
            <FluxPaneBody>
                <FluxFlex
                    direction="vertical"
                    :gap="18">
                    <FluxFlex
                        align="center"
                        :gap="12">
                        <FluxIcon
                            name="bolt"
                            :size="20"/>

                        <FluxFlex
                            direction="vertical"
                            :gap="3">
                            <strong>Command center</strong>
                            <span style="color: var(--foreground-secondary)">Search, navigate and run actions from one place.</span>
                        </FluxFlex>

                        <FluxSpacer/>

                        <FluxBadge
                            color="primary"
                            icon="magnifying-glass"
                            label="⌘K"/>
                    </FluxFlex>

                    <FluxSecondaryButton
                        icon-leading="magnifying-glass"
                        label="Open command palette"
                        @click="commandPalette?.open()"/>

                    <FluxFlex
                        direction="vertical"
                        :gap="3">
                        <FluxCommandPaletteGroup
                            icon="rocket"
                            label="Quick commands"/>

                        <FluxCommandPaletteItem
                            v-for="(command, index) in quickCommands"
                            :key="command.id"
                            :command="command.command"
                            :icon="command.icon"
                            :is-highlighted="highlightedIndex === index"
                            :label="command.label"
                            :sub-label="command.subLabel"
                            @activate="activate(command.label)"
                            @highlight="highlightedIndex = index"/>
                    </FluxFlex>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>

        <FluxCommandPalette
            ref="commandPalette"
            placeholder="What are you looking for?"
            :sources="sources"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxCommandSource, FluxIconName } from '@flux-ui/types';
    import { FluxBadge, FluxCommandPalette, FluxCommandPaletteGroup, FluxCommandPaletteItem, FluxFlex, FluxIcon, FluxPane, FluxPaneBody, FluxSecondaryButton, FluxSpacer, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const commandPalette = ref<InstanceType<typeof FluxCommandPalette>>();
    const highlightedIndex = ref(-1);

    const activate = (label: string) => showSnackbar({
        icon: 'circle-check',
        message: `Activated: ${label}`
    });

    const quickCommands: { id: string; label: string; subLabel: string; icon: FluxIconName; command: string; }[] = [
        {id: 'new-project', label: 'Create project', subLabel: 'Start from a blank workspace', icon: 'plus', command: '⌘N'},
        {id: 'invite', label: 'Invite teammate', subLabel: 'Send an invitation by email', icon: 'user-plus', command: '⌘I'},
        {id: 'search-docs', label: 'Search documentation', subLabel: 'Find guides and references', icon: 'book', command: '⌘/'}
    ];

    const sources: FluxCommandSource[] = [
        {
            key: 'navigation',
            label: '',
            items: [
                {
                    id: 'nav-dashboard',
                    label: 'Dashboard',
                    icon: 'gauge-high',
                    onActivate: () => activate('Dashboard')
                },
                {
                    id: 'nav-projects',
                    label: 'Projects',
                    icon: 'cubes',
                    onActivate: () => activate('Projects')
                },
                {
                    id: 'nav-team',
                    label: 'Team',
                    icon: 'users',
                    onActivate: () => activate('Team')
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
            key: 'actions',
            label: 'Actions',
            icon: 'bolt',
            tab: true,
            items: [
                {
                    id: 'a-new-project',
                    label: 'Create project',
                    icon: 'plus',
                    command: '⌘N',
                    onActivate: () => activate('Create project')
                },
                {
                    id: 'a-invite',
                    label: 'Invite teammate',
                    icon: 'user-plus',
                    command: '⌘I',
                    onActivate: () => activate('Invite teammate')
                },
                {
                    id: 'a-theme',
                    label: 'Theme',
                    icon: 'palette',
                    subActions: [
                        {label: 'Light', icon: 'sun', onActivate: () => activate('Theme: Light')},
                        {label: 'Dark', icon: 'moon', onActivate: () => activate('Theme: Dark')},
                        {label: 'System', icon: 'desktop', onActivate: () => activate('Theme: System')}
                    ],
                    onActivate: () => activate('Theme')
                },
                {
                    id: 'a-export',
                    label: 'Export data',
                    icon: 'arrow-up-from-square',
                    command: '⌘E',
                    onActivate: () => activate('Export data')
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
                    label: 'Quarterly report',
                    subLabel: 'Viewed 5 minutes ago',
                    icon: 'file-lines',
                    onActivate: () => activate('Quarterly report')
                },
                {
                    id: 'r2',
                    label: 'Marketing site',
                    subLabel: 'Edited 1 hour ago',
                    icon: 'globe',
                    onActivate: () => activate('Marketing site')
                },
                {
                    id: 'r3',
                    label: 'Onboarding flow',
                    subLabel: 'Viewed yesterday',
                    icon: 'rocket',
                    onActivate: () => activate('Onboarding flow')
                }
            ]
        }
    ];
</script>
