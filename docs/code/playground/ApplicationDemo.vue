<template>
    <div
        :class="$style.demoFrame"
        data-prose-full>
        <div :class="$style.scroller">
            <FluxApplication show-desktop-menu-toggle>
                <template #menu>
                    <FluxApplicationMenu>
                        <template #header>
                            <FluxMenuGroup is-horizontal>
                                <FluxApplicationMenuAccount
                                    icon="cubes"
                                    label="Northwind">
                                    <template #switcher>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuSubHeader label="Workspaces"/>

                                                <FluxMenuItem
                                                    v-for="workspace of workspaces"
                                                    :key="workspace.id"
                                                    :icon-leading="workspace.icon"
                                                    is-selectable
                                                    :is-selected="workspace.id === activeWorkspace"
                                                    :label="workspace.label"
                                                    @click="activeWorkspace = workspace.id"/>
                                            </FluxMenuGroup>

                                            <FluxSeparator/>

                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    icon-leading="circle-plus"
                                                    label="New workspace"/>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </template>
                                </FluxApplicationMenuAccount>
                            </FluxMenuGroup>
                        </template>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                v-for="item of primaryNavigation"
                                :key="item.id"
                                :icon-leading="item.icon"
                                :is-active="item.id === activePage"
                                :label="item.label"
                                @click="activePage = item.id"/>
                        </FluxMenuGroup>

                        <FluxDivider/>

                        <FluxMenuGroup>
                            <FluxMenuSubHeader label="Workspace"/>

                            <FluxMenuItem
                                v-for="item of workspaceNavigation"
                                :key="item.id"
                                :icon-leading="item.icon"
                                :is-active="item.id === activePage"
                                :label="item.label"
                                @click="activePage = item.id"/>
                        </FluxMenuGroup>

                        <FluxDivider/>

                        <FluxMenuGroup>
                            <FluxMenuSubHeader label="Automation"/>

                            <FluxMenuItem
                                v-for="item of automationNavigation"
                                :key="item.id"
                                :icon-leading="item.icon"
                                :is-active="item.id === activePage"
                                :label="item.label"
                                @click="activePage = item.id"/>

                            <FluxMenuItem
                                disabled
                                icon-leading="robot"
                                label="Agents"/>
                        </FluxMenuGroup>

                        <template #footer>
                            <FluxApplicationMenuPromo icon="rocket">
                                <strong>Trial ends in 12 days</strong>
                                <p>Pick a plan to keep automations running after the trial.</p>
                                <a href="#">Compare plans</a>
                            </FluxApplicationMenuPromo>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="user-key"
                                    :is-active="activePage === 'admin'"
                                    label="Administration"
                                    @click="activePage = 'admin'"/>

                                <FluxMenuItem
                                    icon-leading="gear"
                                    :is-active="activePage === 'settings'"
                                    label="Settings"
                                    @click="activePage = 'settings'"/>
                            </FluxMenuGroup>
                        </template>
                    </FluxApplicationMenu>
                </template>

                <FluxApplicationTop
                    :icon="activeNavigationItem.icon"
                    :title="activeNavigationItem.label">
                    <template #end>
                        <FluxAdaptiveSlot>
                            <FluxFormInput
                                v-model="search"
                                :class="$style.demoSearch"
                                icon-leading="magnifying-glass"
                                placeholder="Search invoices, clients..."
                                type="search"/>

                            <template #fallback>
                                <FluxSecondaryLinkButton
                                    icon-leading="magnifying-glass"
                                    size="small"/>
                            </template>
                        </FluxAdaptiveSlot>

                        <FluxButtonStack :gap="0">
                            <FluxTooltip content="Notifications">
                                <FluxSecondaryLinkButton
                                    icon-leading="bell"
                                    size="small"/>
                            </FluxTooltip>

                            <FluxTooltip content="Support">
                                <FluxSecondaryLinkButton
                                    icon-leading="circle-question"
                                    size="small"/>
                            </FluxTooltip>
                        </FluxButtonStack>

                        <FluxSeparator direction="vertical"/>

                        <FluxFlyout is-auto-width>
                            <template #opener="{open}">
                                <FluxAvatar
                                    alt="Ada Lovelace"
                                    fallback-initials="AL"
                                    :size="30"
                                    status="success"
                                    type="button"
                                    @click="open()"/>
                            </template>

                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuSubHeader label="Ada Lovelace"/>

                                    <FluxMenuItem
                                        icon-leading="user"
                                        label="Profile"/>

                                    <FluxMenuItem
                                        icon-leading="gear"
                                        label="Preferences"/>
                                </FluxMenuGroup>

                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="arrow-right-from-bracket"
                                        is-destructive
                                        label="Sign out"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxFlyout>
                    </template>

                    <template #tabs>
                        <FluxTabBarItem
                            v-for="tab of tabs"
                            :key="tab"
                            :is-active="tab === activeTab"
                            :label="tab"
                            @click="activeTab = tab"/>
                    </template>
                </FluxApplicationTop>

                <FluxApplicationContent layout="dashboard">
                    <FluxApplicationHero
                        subtitle="A summary of everything that moved in this workspace over the last 30 days."
                        title="Good afternoon, Ada">
                        <template #end>
                            <FluxPrimaryButton
                                icon-leading="plus"
                                label="New invoice"/>
                        </template>
                    </FluxApplicationHero>

                    <FluxApplicationSection
                        info="Compared to the previous 30 days"
                        title="Key figures">
                        <div :class="$style.demoMetrics">
                            <FluxPane
                                v-for="metric of metrics"
                                :key="metric.label">
                                <FluxPaneBody>
                                    <div :class="$style.demoMetric">
                                        <span :class="$style.demoMetricLabel">{{ metric.label }}</span>
                                        <strong :class="$style.demoMetricValue">{{ metric.value }}</strong>

                                        <FluxBadge
                                            :color="metric.color"
                                            :icon="metric.icon"
                                            :label="metric.trend"/>
                                    </div>
                                </FluxPaneBody>
                            </FluxPane>
                        </div>
                    </FluxApplicationSection>

                    <FluxApplicationSection title="Latest invoices">
                        <template #end>
                            <FluxSecondaryButton
                                icon-trailing="angle-right"
                                label="View all"
                                size="small"/>
                        </template>

                        <FluxPane>
                            <FluxPaneHeader
                                icon="receipt"
                                subtitle="Everything issued in the last two weeks"
                                title="Invoices"/>

                            <FluxTable is-hoverable>
                                <template #header>
                                    <FluxTableBar>
                                        <FluxFlex
                                            align="center"
                                            :gap="9">
                                            <span>{{ invoices.length }} invoices</span>
                                            <FluxSpacer/>

                                            <FluxTableActions>
                                                <FluxAction icon="filter"/>
                                                <FluxAction icon="arrow-down-to-line"/>
                                            </FluxTableActions>
                                        </FluxFlex>
                                    </FluxTableBar>

                                    <FluxTableRow>
                                        <FluxTableHeader :min-width="150">Number</FluxTableHeader>
                                        <FluxTableHeader :min-width="210">Client</FluxTableHeader>
                                        <FluxTableHeader :min-width="150">Status</FluxTableHeader>
                                        <FluxTableHeader :min-width="150">Issued</FluxTableHeader>

                                        <FluxTableHeader
                                            align="end"
                                            is-numeric
                                            :min-width="135">
                                            Amount
                                        </FluxTableHeader>
                                    </FluxTableRow>
                                </template>

                                <FluxTableRow
                                    v-for="invoice of invoices"
                                    :key="invoice.number"
                                    is-clickable>
                                    <FluxTableCell>
                                        <strong>{{ invoice.number }}</strong>
                                    </FluxTableCell>

                                    <FluxTableCell>{{ invoice.client }}</FluxTableCell>

                                    <FluxTableCell>
                                        <FluxBadge
                                            :color="invoice.color"
                                            dot
                                            :label="invoice.status"/>
                                    </FluxTableCell>

                                    <FluxTableCell>{{ invoice.issued }}</FluxTableCell>
                                    <FluxTableCell>{{ invoice.amount }}</FluxTableCell>
                                </FluxTableRow>
                            </FluxTable>
                        </FluxPane>
                    </FluxApplicationSection>
                </FluxApplicationContent>
            </FluxApplication>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplication, FluxApplicationContent, FluxApplicationHero, FluxApplicationMenu, FluxApplicationMenuAccount, FluxApplicationMenuPromo, FluxApplicationSection, FluxApplicationTop } from '@flux-ui/application';
    import { FluxAction, FluxAdaptiveSlot, FluxAvatar, FluxBadge, FluxButtonStack, FluxDivider, FluxFlex, FluxFlyout, FluxFormInput, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSecondaryLinkButton, FluxSeparator, FluxSpacer, FluxTabBarItem, FluxTable, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTooltip } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, ref } from 'vue';

    type NavigationItem = {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
    };

    const primaryNavigation: NavigationItem[] = [
        {icon: 'grid-2', id: 'dashboard', label: 'Dashboard'}
    ];

    const workspaceNavigation: NavigationItem[] = [
        {icon: 'users', id: 'clients', label: 'Clients'},
        {icon: 'receipt', id: 'invoices', label: 'Invoices'},
        {icon: 'chart-line', id: 'reports', label: 'Reports'}
    ];

    const automationNavigation: NavigationItem[] = [
        {icon: 'bolt', id: 'automations', label: 'Automations'},
        {icon: 'puzzle-piece', id: 'integrations', label: 'Integrations'}
    ];

    const footerNavigation: NavigationItem[] = [
        {icon: 'user-key', id: 'admin', label: 'Administration'},
        {icon: 'gear', id: 'settings', label: 'Settings'}
    ];

    const workspaces: NavigationItem[] = [
        {icon: 'cubes', id: 'northwind', label: 'Northwind'},
        {icon: 'store', id: 'riverside', label: 'Riverside Supply'},
        {icon: 'building', id: 'atlas', label: 'Atlas Group'}
    ];

    const metrics = [
        {color: 'success', icon: 'arrow-trend-up', label: 'Revenue', trend: '+12.4%', value: '€ 48,290'},
        {color: 'success', icon: 'arrow-trend-up', label: 'Active clients', trend: '+3.1%', value: '1,284'},
        {color: 'warning', icon: 'arrow-trend-down', label: 'Open invoices', trend: '-8.0%', value: '37'},
        {color: 'gray', icon: 'stopwatch', label: 'Average payment term', trend: 'Unchanged', value: '18 days'}
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly icon: FluxIconName;
        readonly label: string;
        readonly trend: string;
        readonly value: string;
    }[];

    const invoices = [
        {amount: '€ 4,280.00', client: 'Riverside Supply', color: 'success', issued: '12 Mar 2026', number: 'INV-2026-0148', status: 'Paid'},
        {amount: '€ 1,190.50', client: 'Atlas Group', color: 'info', issued: '11 Mar 2026', number: 'INV-2026-0147', status: 'Sent'},
        {amount: '€ 12,400.00', client: 'Halcyon Studio', color: 'warning', issued: '09 Mar 2026', number: 'INV-2026-0146', status: 'Overdue'},
        {amount: '€ 860.00', client: 'Meridian Labs', color: 'success', issued: '07 Mar 2026', number: 'INV-2026-0145', status: 'Paid'},
        {amount: '€ 3,015.75', client: 'Northgate Rail', color: 'gray', issued: '05 Mar 2026', number: 'INV-2026-0144', status: 'Draft'},
        {amount: '€ 640.00', client: 'Ivy & Stone', color: 'danger', issued: '02 Mar 2026', number: 'INV-2026-0143', status: 'Disputed'}
    ] satisfies readonly {
        readonly amount: string;
        readonly client: string;
        readonly color: FluxColor;
        readonly issued: string;
        readonly number: string;
        readonly status: string;
    }[];

    const tabs = ['Overview', 'Activity', 'Automations'];

    const activePage = ref('dashboard');
    const activeTab = ref(tabs[0]);
    const activeWorkspace = ref('northwind');
    const search = ref('');

    const navigation = [...primaryNavigation, ...workspaceNavigation, ...automationNavigation, ...footerNavigation];

    const activeNavigationItem = computed(() => navigation.find(item => item.id === activePage.value) ?? primaryNavigation[0]);

</script>

<style
    lang="scss"
    module>
    // `--application-height` is what the shell measures against instead of the
    // viewport, and containment makes this the containing block for its
    // `position: fixed` rail and backdrop, clipped to the radius.
    .demoFrame {
        --application-height: 1080px;

        position: relative;
        height: var(--application-height);
        contain: layout paint;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    // The shell's top bar is sticky, so it needs a scroll container that is not the page.
    .scroller {
        height: 100%;
        overscroll-behavior: contain;
        overflow-y: auto;
    }

    .demoSearch {
        width: 261px;
    }

    .demoMetrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 21px;
    }

    .demoMetric {
        display: flex;
        align-items: start;
        flex-flow: column;
        gap: 6px;
    }

    .demoMetricLabel {
        font-size: var(--font-size-small);
        color: var(--foreground-secondary);
    }

    .demoMetricValue {
        font-size: 27px;
        font-weight: 700;
        line-height: 1.2;
        color: var(--foreground-prominent);
    }
</style>
