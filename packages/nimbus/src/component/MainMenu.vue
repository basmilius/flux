<template>
    <FluxApplicationMenu>
        <template #logo>
            <FluxBoxedIcon
                color="primary"
                name="cloud"/>
        </template>

        <template #header>
            <FluxMenuGroup is-horizontal>
                <FluxApplicationMenuAccount
                    icon="cloud"
                    label="Nimbus Studio"/>
            </FluxMenuGroup>

            <FluxMenuGroup
                v-if="levels.length > 1"
                is-horizontal>
                <FluxMenuItem
                    v-for="(level, index) of levels"
                    :key="index"
                    :icon-leading="level.icon"
                    :is-highlighted="index === viewIndex"
                    :label="level.label"
                    @click="goToLevel(index)"/>
            </FluxMenuGroup>
        </template>

        <template
            v-for="(group, groupIndex) of navGroups"
            :key="groupIndex">
            <FluxDivider v-if="groupIndex > 0"/>

            <FluxMenuSubHeader
                v-if="groupIndex > 0"
                :label="group.title"/>

            <FluxMenuGroup>
                <FluxMenuItem
                    v-for="item of group.items"
                    :key="item.name"
                    :icon-leading="item.icon"
                    :is-active="isActive(item.name, item.match)"
                    :label="item.label"
                    type="route"
                    :to="{name: item.name}"/>
            </FluxMenuGroup>
        </template>

        <FluxDivider/>

        <FluxMenuCollapsible
            icon-leading="chart-line"
            is-opened
            label="Insights">
            <FluxMenuItem
                v-for="item of insights.items"
                :key="item.name"
                :icon-leading="item.icon"
                :is-active="isActive(item.name, item.match)"
                :label="item.label"
                type="route"
                :to="{name: item.name}"/>
        </FluxMenuCollapsible>

        <FluxDivider/>

        <FluxMenuGroup>
            <FluxMenuFlyout
                icon="clock"
                label="Recent projects">
                <FluxMenuPane>
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                v-for="project of recentProjects"
                                :key="project.id"
                                :icon-leading="project.icon"
                                :label="project.name"
                                type="route"
                                :to="{name: 'project', params: {id: project.id}}"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxMenuPane>
            </FluxMenuFlyout>
        </FluxMenuGroup>

        <template #context>
            <FluxApplicationMenuContextStack name="menu"/>
        </template>

        <template #footer>
            <FluxApplicationMenuPromo icon="rocket">
                <strong>Upgrade to Pro</strong>
                <p>Unlimited projects, advanced reports and priority support.</p>
                <FluxPrimaryButton
                    icon-leading="bolt"
                    label="See plans"
                    size="small"
                    type="route"
                    :to="{name: 'billing'}"/>
            </FluxApplicationMenuPromo>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="gear"
                    :is-active="isActive('settings')"
                    label="Settings"
                    type="route"
                    :to="{name: 'settings'}"/>

                <FluxMenuItem
                    icon-leading="circle-info"
                    label="Documentation"
                    type="link"
                    href="https://flux-ui.dev"
                    target="_blank"/>
            </FluxMenuGroup>
        </template>
    </FluxApplicationMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationMenu, FluxApplicationMenuAccount, FluxApplicationMenuContextStack, FluxApplicationMenuPromo, useApplicationInjection } from '@flux-ui/application';
    import { FluxBoxedIcon, FluxDivider, FluxMenu, FluxMenuCollapsible, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxMenuSubHeader, FluxPrimaryButton } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useProjectsStore } from '@/store';

    type NavItem = {
        readonly name: string;
        readonly label: string;
        readonly icon: FluxIconName;
        readonly match?: readonly string[];
    };

    type NavGroup = {
        readonly title: string;
        readonly icon: FluxIconName;
        readonly items: NavItem[];
    };

    const projectRoutes = ['projects', 'project-new', 'project', 'project-board', 'project-files', 'project-calendar', 'project-activity', 'project-settings'];

    const navGroups: NavGroup[] = [
        {
            title: 'Workspace',
            icon: 'grid-2',
            items: [
                {name: 'dashboard', label: 'Dashboard', icon: 'grid-2'},
                {name: 'inbox', label: 'Inbox', icon: 'inbox'}
            ]
        },
        {
            title: 'Delivery',
            icon: 'diagram-project',
            items: [
                {name: 'projects', label: 'Projects', icon: 'diagram-project', match: projectRoutes},
                {name: 'calendar', label: 'Calendar', icon: 'calendar'},
                {name: 'timesheets', label: 'Timesheets', icon: 'stopwatch'}
            ]
        },
        {
            title: 'Sales',
            icon: 'sack-dollar',
            items: [
                {name: 'clients', label: 'Clients', icon: 'handshake', match: ['clients', 'client']},
                {name: 'deals', label: 'Pipeline', icon: 'sack-dollar'},
                {name: 'invoices', label: 'Invoices', icon: 'file-invoice-dollar', match: ['invoices', 'invoice', 'invoice-new', 'invoice-edit']}
            ]
        }
    ];

    const insights: NavGroup = {
        title: 'Insights',
        icon: 'chart-line',
        items: [
            {name: 'team', label: 'Team', icon: 'user-group', match: ['team', 'team-member']},
            {name: 'goals', label: 'Goals', icon: 'bullseye'},
            {name: 'reports', label: 'Reports', icon: 'chart-line', match: ['reports', 'reports-financial', 'reports-team', 'reports-pipeline']}
        ]
    };

    const route = useRoute();
    const {projects} = useProjectsStore();
    const {contexts, viewIndex, goToLevel} = useApplicationInjection();

    const recentProjects = computed(() => projects.value.slice(0, 5));

    const levels = computed(() => [
        {label: 'Menu', icon: 'bars' as FluxIconName},
        ...contexts.value.map(context => ({label: context.title, icon: context.icon ?? 'diagram-project' as FluxIconName}))
    ]);

    function isActive(name: string, match?: readonly string[]): boolean {
        const current = String(route.name ?? '');
        return current === name || (match?.includes(current) ?? false);
    }
</script>
