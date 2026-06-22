<template>
    <FluxApplicationMenu>
        <template #logo>
            <FluxBoxedIcon
                color="primary"
                name="chart-line"/>
        </template>

        <template #header>
            <FluxMenuGroup is-horizontal>
                <FluxApplicationMenuAccount
                    icon="globe"
                    :label="account.property"/>
            </FluxMenuGroup>
        </template>

        <template
            v-for="(group, groupIndex) of navGroups"
            :key="groupIndex">
            <FluxDivider v-if="groupIndex > 0"/>

            <FluxMenuSubHeader
                v-if="group.title"
                :label="group.title"/>

            <FluxMenuGroup>
                <FluxMenuItem
                    v-for="item of group.items"
                    :key="item.name"
                    :icon-leading="item.icon"
                    :is-active="isActive(item.name)"
                    :label="item.label"
                    type="route"
                    :to="{name: item.name}"/>
            </FluxMenuGroup>
        </template>

        <FluxDivider/>

        <FluxMenuGroup>
            <FluxMenuFlyout
                icon="star"
                label="Saved reports">
                <FluxMenuPane>
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                v-for="report of savedReports"
                                :key="report.label"
                                :icon-leading="report.icon"
                                :label="report.label"
                                type="route"
                                :to="{name: report.name}"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxMenuPane>
            </FluxMenuFlyout>
        </FluxMenuGroup>

        <template #footer>
            <FluxApplicationMenuPromo icon="rocket">
                <strong>Upgrade to Pro</strong>
                <p>Unlimited events, custom funnels, data exports and longer retention.</p>
                <FluxPrimaryButton
                    icon-leading="bolt"
                    label="See plans"
                    size="small"
                    @click="onUpgrade()"/>
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
    import { FluxApplicationMenu, FluxApplicationMenuAccount, FluxApplicationMenuPromo } from '@flux-ui/application';
    import { FluxBoxedIcon, FluxDivider, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxMenuSubHeader, FluxPrimaryButton, showSnackbar } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { useRoute } from 'vue-router';
    import { useAnalyticsStore } from '@/store';

    type NavItem = {
        readonly name: string;
        readonly label: string;
        readonly icon: FluxIconName;
    };

    const navGroups: { title: string; items: NavItem[] }[] = [
        {
            title: '',
            items: [
                {name: 'overview', label: 'Overview', icon: 'grid-2'},
                {name: 'realtime', label: 'Realtime', icon: 'bolt'}
            ]
        },
        {
            title: 'Reports',
            items: [
                {name: 'audience', label: 'Audience', icon: 'users'},
                {name: 'acquisition', label: 'Acquisition', icon: 'share-nodes'},
                {name: 'behavior', label: 'Behavior', icon: 'arrow-pointer'},
                {name: 'conversions', label: 'Conversions', icon: 'bullseye'}
            ]
        },
        {
            title: 'Data',
            items: [
                {name: 'reports', label: 'Explorer', icon: 'table-cells'}
            ]
        }
    ];

    const savedReports: (NavItem & { icon: FluxIconName })[] = [
        {name: 'acquisition', label: 'Paid performance', icon: 'bolt'},
        {name: 'behavior', label: 'Top landing pages', icon: 'arrow-pointer'},
        {name: 'conversions', label: 'Signup funnel', icon: 'bullseye'},
        {name: 'audience', label: 'Mobile audience', icon: 'mobile'}
    ];

    const route = useRoute();
    const {account} = useAnalyticsStore();

    function isActive(name: string): boolean {
        return String(route.name ?? '') === name;
    }

    function onUpgrade(): void {
        showSnackbar({icon: 'rocket', message: 'Pro plans are not available in this demo.'});
    }
</script>
