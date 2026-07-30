<template>
    <FluxApplication show-desktop-menu-toggle>
        <template #menu>
            <FluxApplicationMenu>
                <template #header>
                    <FluxMenuGroup is-horizontal>
                        <FluxApplicationMenuAccount
                            :icon="activeWorkspace.icon"
                            :label="activeWorkspace.label">
                            <template #switcher>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuSubHeader label="Workspaces"/>

                                        <FluxMenuItem
                                            v-for="workspace of workspaces"
                                            :key="workspace.id"
                                            :icon-leading="workspace.icon"
                                            is-selectable
                                            :is-selected="workspace.id === activeWorkspaceId"
                                            :label="workspace.label"
                                            @click="activeWorkspaceId = workspace.id"/>
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
                        v-for="item of operationsNavigation"
                        :key="item.id"
                        :icon-leading="item.icon"
                        :is-active="item.id === activePageId"
                        :label="item.label"
                        @click="activePageId = item.id"/>
                </FluxMenuGroup>

                <FluxDivider/>

                <FluxMenuGroup>
                    <FluxMenuSubHeader label="Catalog"/>

                    <FluxMenuItem
                        v-for="item of catalogNavigation"
                        :key="item.id"
                        :icon-leading="item.icon"
                        :is-active="item.id === activePageId"
                        :label="item.label"
                        @click="activePageId = item.id"/>
                </FluxMenuGroup>

                <FluxDivider/>

                <FluxMenuGroup>
                    <FluxMenuSubHeader label="Insights"/>

                    <FluxMenuItem
                        v-for="item of insightsNavigation"
                        :key="item.id"
                        :icon-leading="item.icon"
                        :is-active="item.id === activePageId"
                        :label="item.label"
                        @click="activePageId = item.id"/>

                    <FluxMenuItem
                        disabled
                        icon-leading="robot"
                        label="Forecasting"/>
                </FluxMenuGroup>

                <template #footer>
                    <FluxApplicationMenuPromo icon="rocket">
                        <strong>Trial ends in 9 days</strong>
                        <p>Pick a plan to keep carrier rates and label printing after the trial.</p>
                        <a href="#">Compare plans</a>
                    </FluxApplicationMenuPromo>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            v-for="item of footerNavigation"
                            :key="item.id"
                            :icon-leading="item.icon"
                            :is-active="item.id === activePageId"
                            :label="item.label"
                            @click="activePageId = item.id"/>
                    </FluxMenuGroup>
                </template>
            </FluxApplicationMenu>
        </template>

        <FluxNotice
            v-if="isAnnouncementVisible"
            color="warning"
            icon="screwdriver-wrench"
            is-center
            is-closeable
            is-fluid
            message="Carrier rates are read only tonight between 23:00 and 01:00 CET while we migrate the rate engine."
            @close="isAnnouncementVisible = false">
            <template #end>
                <FluxSecondaryButton
                    label="Read the notice"
                    size="small"/>
            </template>
        </FluxNotice>

        <FluxApplicationTop
            :icon="activePage.icon"
            :title="activePage.label">
            <template #end>
                <FluxAdaptiveSlot>
                    <FluxFormInput
                        v-model="search"
                        :class="$style.dashboardSearch"
                        icon-leading="magnifying-glass"
                        placeholder="Search orders, tracking codes..."
                        type="search"/>

                    <template #fallback>
                        <FluxSecondaryLinkButton
                            icon-leading="magnifying-glass"
                            size="small"/>
                    </template>
                </FluxAdaptiveSlot>

                <FluxButtonStack :gap="0">
                    <FluxTooltip
                        v-if="!isAnnouncementVisible"
                        content="Show announcement">
                        <FluxSecondaryLinkButton
                            icon-leading="circle-info"
                            size="small"
                            @click="isAnnouncementVisible = true"/>
                    </FluxTooltip>

                    <FluxTooltip content="Notifications">
                        <FluxSecondaryLinkButton
                            icon-leading="bell"
                            size="small"/>
                    </FluxTooltip>

                    <FluxTooltip :content="isSideVisible ? 'Hide open tasks' : 'Show open tasks'">
                        <FluxSecondaryLinkButton
                            :aria-expanded="isSideVisible"
                            icon-leading="sidebar-flip"
                            :is-active="isSideVisible"
                            size="small"
                            @click="isSideVisible = !isSideVisible"/>
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
                    v-for="tab of activePage.tabs"
                    :key="tab"
                    :is-active="tab === activeTab"
                    :label="tab"
                    @click="activeTab = tab"/>
            </template>
        </FluxApplicationTop>

        <FluxApplicationContent layout="dashboard">
            <template v-if="activePageId === 'overview'">
                <FluxApplicationHero
                    subtitle="Everything that moved through the warehouse in the last seven days."
                    title="Good morning, Ada">
                    <template #end>
                        <FluxPrimaryButton
                            icon-leading="plus"
                            label="New order"/>
                    </template>
                </FluxApplicationHero>

                <template v-if="activeTab === 'Summary'">
                    <FluxApplicationSection
                        info="Compared to the previous seven days"
                        title="Key figures">
                        <div :class="$style.dashboardMetrics">
                            <FluxPane
                                v-for="metric of metrics"
                                :key="metric.label">
                                <FluxPaneBody>
                                    <div :class="$style.dashboardMetric">
                                        <span :class="$style.dashboardMetricLabel">{{ metric.label }}</span>
                                        <strong :class="$style.dashboardMetricValue">{{ metric.value }}</strong>

                                        <FluxBadge
                                            :color="metric.color"
                                            :icon="metric.icon"
                                            :label="metric.trend"/>
                                    </div>
                                </FluxPaneBody>
                            </FluxPane>
                        </div>
                    </FluxApplicationSection>

                    <FluxApplicationSection title="Shipments in transit">
                        <template #end>
                            <FluxSecondaryButton
                                icon-trailing="angle-right"
                                label="View all"
                                size="small"
                                @click="activePageId = 'shipments'"/>
                        </template>

                        <FluxPane>
                            <FluxPaneHeader
                                icon="truck"
                                subtitle="Handed over to a carrier and not delivered yet"
                                title="On the road"/>

                            <FluxTable is-hoverable>
                                <template #header>
                                    <FluxTableRow>
                                        <FluxTableHeader :min-width="165">Tracking</FluxTableHeader>
                                        <FluxTableHeader :min-width="210">Destination</FluxTableHeader>
                                        <FluxTableHeader :min-width="150">Carrier</FluxTableHeader>
                                        <FluxTableHeader :min-width="150">Status</FluxTableHeader>
                                        <FluxTableHeader :min-width="150">Promised</FluxTableHeader>
                                    </FluxTableRow>
                                </template>

                                <FluxTableRow
                                    v-for="shipment of shipments"
                                    :key="shipment.tracking"
                                    is-clickable>
                                    <FluxTableCell>
                                        <strong>{{ shipment.tracking }}</strong>
                                    </FluxTableCell>

                                    <FluxTableCell>{{ shipment.destination }}</FluxTableCell>
                                    <FluxTableCell>{{ shipment.carrier }}</FluxTableCell>

                                    <FluxTableCell>
                                        <FluxBadge
                                            :color="shipment.color"
                                            dot
                                            :label="shipment.status"/>
                                    </FluxTableCell>

                                    <FluxTableCell>{{ shipment.promised }}</FluxTableCell>
                                </FluxTableRow>
                            </FluxTable>
                        </FluxPane>
                    </FluxApplicationSection>
                </template>

                <FluxApplicationSection
                    v-else
                    info="Newest first"
                    title="Warehouse activity">
                    <FluxPane>
                        <FluxPaneBody>
                            <FluxTimeline>
                                <FluxTimelineItem
                                    v-for="entry of activity"
                                    :key="entry.id"
                                    :icon="entry.icon"
                                    :title="entry.title"
                                    :when="entry.when">
                                    {{ entry.description }}
                                </FluxTimelineItem>
                            </FluxTimeline>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxApplicationSection>
            </template>

            <template v-else-if="activePageId === 'orders'">
                <FluxApplicationPageHeader
                    description="Every order that came in through the store, the API and the customer portal."
                    title="Orders">
                    <template #actions>
                        <FluxSecondaryButton
                            icon-leading="arrow-down-to-line"
                            label="Export"/>

                        <FluxPrimaryButton
                            icon-leading="plus"
                            label="New order"/>
                    </template>
                </FluxApplicationPageHeader>

                <FluxApplicationSection
                    info="Filtered by the tab in the top bar"
                    :title="activeTab">
                    <FluxPane>
                        <FluxTable is-hoverable>
                            <template #header>
                                <FluxTableBar>
                                    <FluxFlex
                                        align="center"
                                        :gap="9">
                                        <span>{{ visibleOrders.length }} of {{ orders.length }} orders</span>
                                        <FluxSpacer/>

                                        <FluxTableActions>
                                            <FluxAction icon="filter"/>
                                            <FluxAction icon="arrow-down-to-line"/>
                                        </FluxTableActions>
                                    </FluxFlex>
                                </FluxTableBar>

                                <FluxTableRow>
                                    <FluxTableHeader :min-width="150">Order</FluxTableHeader>
                                    <FluxTableHeader :min-width="210">Customer</FluxTableHeader>
                                    <FluxTableHeader :min-width="150">Status</FluxTableHeader>
                                    <FluxTableHeader :min-width="150">Placed</FluxTableHeader>

                                    <FluxTableHeader
                                        align="end"
                                        is-numeric
                                        :min-width="135">
                                        Total
                                    </FluxTableHeader>
                                </FluxTableRow>
                            </template>

                            <FluxTableRow
                                v-for="order of visibleOrders"
                                :key="order.number"
                                is-clickable>
                                <FluxTableCell>
                                    <strong>{{ order.number }}</strong>
                                </FluxTableCell>

                                <FluxTableCell>{{ order.customer }}</FluxTableCell>

                                <FluxTableCell>
                                    <FluxBadge
                                        :color="order.color"
                                        dot
                                        :label="order.status"/>
                                </FluxTableCell>

                                <FluxTableCell>{{ order.placed }}</FluxTableCell>
                                <FluxTableCell>{{ order.total }}</FluxTableCell>
                            </FluxTableRow>
                        </FluxTable>
                    </FluxPane>
                </FluxApplicationSection>
            </template>

            <template v-else>
                <FluxApplicationPageHeader
                    :description="`${activePage.label} is not part of this playground, but the page still keeps the gutter, the heading and the actions of every other page.`"
                    :title="activePage.label">
                    <template #actions>
                        <FluxSecondaryButton
                            icon-leading="angle-left"
                            label="Back to the overview"
                            @click="activePageId = 'overview'"/>
                    </template>
                </FluxApplicationPageHeader>

                <FluxApplicationSection>
                    <FluxPane>
                        <FluxPaneBody>
                            <FluxPlaceholder
                                :icon="activePage.icon"
                                message="Pick another item in the rail to come back to a page that does."
                                :title="`${activePage.label} has no demo content`"/>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxApplicationSection>
            </template>
        </FluxApplicationContent>


        <template #side>
            <FluxApplicationSide v-model:is-visible="isSideVisible">
                <FluxPaneHeader
                    icon="list-check"
                    title="Open tasks">
                    <template #end>
                        <FluxTooltip content="Hide open tasks">
                            <FluxSecondaryLinkButton
                                icon-leading="xmark"
                                size="small"
                                @click="isSideVisible = false"/>
                        </FluxTooltip>
                    </template>
                </FluxPaneHeader>

                <FluxPaneBody :class="$style.sideBody">
                    <FluxItemStack>
                        <FluxItem
                            v-for="task of openTasks"
                            :key="task.id">
                            <FluxItemContent>
                                <strong>{{ task.title }}</strong>
                                <p>{{ task.description }}</p>
                            </FluxItemContent>

                            <FluxItemActions>
                                <FluxBadge
                                    :color="task.color"
                                    :label="task.due"
                                    size="small"/>
                            </FluxItemActions>
                        </FluxItem>
                    </FluxItemStack>
                </FluxPaneBody>
            </FluxApplicationSide>
        </template>
    </FluxApplication>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplication, FluxApplicationContent, FluxApplicationHero, FluxApplicationMenu, FluxApplicationMenuAccount, FluxApplicationMenuPromo, FluxApplicationPageHeader, FluxApplicationSection, FluxApplicationSide, FluxApplicationTop } from '@flux-ui/application';
    import { FluxAction, FluxAdaptiveSlot, FluxAvatar, FluxBadge, FluxButtonStack, FluxDivider, FluxFlex, FluxFlyout, FluxFormInput, FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPlaceholder, FluxPrimaryButton, FluxSecondaryButton, FluxSecondaryLinkButton, FluxSeparator, FluxSpacer, FluxTabBarItem, FluxTable, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTimeline, FluxTimelineItem, FluxTooltip } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, ref, watch } from 'vue';

    type Page = {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
        readonly tabs: readonly string[];
    };

    const operationsNavigation: Page[] = [
        {icon: 'gauge', id: 'overview', label: 'Overview', tabs: ['Summary', 'Activity']},
        {icon: 'cart-shopping', id: 'orders', label: 'Orders', tabs: ['All orders', 'Unfulfilled', 'On hold', 'Cancelled']},
        {icon: 'truck', id: 'shipments', label: 'Shipments', tabs: ['In transit', 'Delivered']}
    ];

    const catalogNavigation: Page[] = [
        {icon: 'box-archive', id: 'inventory', label: 'Inventory', tabs: ['Stock', 'Purchase orders']},
        {icon: 'users', id: 'customers', label: 'Customers', tabs: ['All customers']},
        {icon: 'building', id: 'carriers', label: 'Carriers', tabs: ['Contracts', 'Rates']}
    ];

    const insightsNavigation: Page[] = [
        {icon: 'chart-line', id: 'reports', label: 'Reports', tabs: ['Revenue', 'Returns']},
        {icon: 'bolt', id: 'automations', label: 'Automations', tabs: ['Rules', 'Runs']}
    ];

    const footerNavigation: Page[] = [
        {icon: 'user-key', id: 'admin', label: 'Administration', tabs: ['Members', 'Audit log']},
        {icon: 'gear', id: 'settings', label: 'Settings', tabs: ['General']}
    ];

    const pages = [...operationsNavigation, ...catalogNavigation, ...insightsNavigation, ...footerNavigation];

    const workspaces = [
        {icon: 'cubes', id: 'benelux', label: 'Harbor Benelux'},
        {icon: 'store', id: 'retail', label: 'Harbor Retail'},
        {icon: 'globe', id: 'export', label: 'Harbor Export'}
    ] satisfies readonly {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
    }[];

    const metrics = [
        {color: 'success', icon: 'arrow-trend-up', label: 'Orders shipped', trend: '+9.2%', value: '2,481'},
        {color: 'success', icon: 'arrow-trend-up', label: 'On time delivery', trend: '+1.4%', value: '96.8%'},
        {color: 'warning', icon: 'arrow-trend-down', label: 'Open returns', trend: '-4.0%', value: '58'},
        {color: 'gray', icon: 'stopwatch', label: 'Average pick time', trend: 'Unchanged', value: '4m 12s'}
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly icon: FluxIconName;
        readonly label: string;
        readonly trend: string;
        readonly value: string;
    }[];

    const shipments = [
        {carrier: 'PostNL', color: 'info', destination: 'Rotterdam, NL', promised: 'Today, 18:00', status: 'Out for delivery', tracking: '3SHRB0148221'},
        {carrier: 'DHL Parcel', color: 'info', destination: 'Antwerp, BE', promised: 'Tomorrow, 12:00', status: 'In transit', tracking: 'JVGL0091724X'},
        {carrier: 'DPD', color: 'warning', destination: 'Cologne, DE', promised: 'Today, 21:00', status: 'Delayed', tracking: '05512480990'},
        {carrier: 'PostNL', color: 'success', destination: 'Utrecht, NL', promised: 'Today, 16:00', status: 'At depot', tracking: '3SHRB0148198'},
        {carrier: 'GLS', color: 'danger', destination: 'Lille, FR', promised: 'Yesterday, 17:00', status: 'Address issue', tracking: 'ZX448120071'}
    ] satisfies readonly {
        readonly carrier: string;
        readonly color: FluxColor;
        readonly destination: string;
        readonly promised: string;
        readonly status: string;
        readonly tracking: string;
    }[];

    const orders = [
        {color: 'gray', customer: 'Riverside Supply', number: 'HRB-24188', placed: '18 Jun 2026', filters: ['Unfulfilled'], status: 'Unfulfilled', total: '€ 1,284.00'},
        {color: 'success', customer: 'Atlas Group', number: 'HRB-24187', placed: '18 Jun 2026', filters: [], status: 'Fulfilled', total: '€ 612.50'},
        {color: 'warning', customer: 'Halcyon Studio', number: 'HRB-24186', placed: '17 Jun 2026', filters: ['On hold'], status: 'On hold', total: '€ 4,940.00'},
        {color: 'gray', customer: 'Meridian Labs', number: 'HRB-24185', placed: '17 Jun 2026', filters: ['Unfulfilled'], status: 'Unfulfilled', total: '€ 218.75'},
        {color: 'success', customer: 'Northgate Rail', number: 'HRB-24184', placed: '16 Jun 2026', filters: [], status: 'Fulfilled', total: '€ 3,015.00'},
        {color: 'danger', customer: 'Ivy & Stone', number: 'HRB-24183', placed: '15 Jun 2026', filters: ['Cancelled'], status: 'Cancelled', total: '€ 96.00'},
        {color: 'warning', customer: 'Bellweather Foods', number: 'HRB-24182', placed: '15 Jun 2026', filters: ['On hold'], status: 'On hold', total: '€ 1,760.40'}
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly customer: string;
        readonly number: string;
        readonly placed: string;
        readonly filters: readonly string[];
        readonly status: string;
        readonly total: string;
    }[];

    const activity = [
        {description: 'Twelve parcels left the Rotterdam depot in the evening run.', icon: 'truck', id: 1, title: 'Carrier pickup confirmed', when: 'Today, 17:42'},
        {description: 'HRB-24186 waits for a customs document before it can be picked.', icon: 'circle-info', id: 2, title: 'Order put on hold', when: 'Today, 15:08'},
        {description: 'Bay C4 dropped below its reorder point of 120 units.', icon: 'box-archive', id: 3, title: 'Stock level warning', when: 'Today, 11:20'},
        {description: 'Rates for the Benelux zone were refreshed from the carrier portal.', icon: 'bolt', id: 4, title: 'Automation ran', when: 'Today, 06:00'}
    ] satisfies readonly {
        readonly description: string;
        readonly icon: FluxIconName;
        readonly id: number;
        readonly title: string;
        readonly when: string;
    }[];

    const openTasks = [
        {color: 'danger', description: 'Customs document missing since this morning.', due: 'Overdue', id: 1, title: 'Release HRB-24186'},
        {color: 'warning', description: 'Bay C4 dropped below its reorder point.', due: 'Today', id: 2, title: 'Restock packing tape'},
        {color: 'gray', description: 'The Benelux zone rates expire at the end of the week.', due: 'Friday', id: 3, title: 'Confirm carrier rates'},
        {color: 'gray', description: 'Two returns are waiting for an inspection slot.', due: 'Next week', id: 4, title: 'Schedule return inspection'}
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly description: string;
        readonly due: string;
        readonly id: number;
        readonly title: string;
    }[];

    const activePageId = ref('overview');
    const activeTab = ref(operationsNavigation[0].tabs[0]);
    const activeWorkspaceId = ref('benelux');
    const isAnnouncementVisible = ref(true);
    const isSideVisible = ref(true);
    const search = ref('');

    const activePage = computed(() => pages.find(page => page.id === activePageId.value) ?? operationsNavigation[0]);
    const activeWorkspace = computed(() => workspaces.find(workspace => workspace.id === activeWorkspaceId.value) ?? workspaces[0]);

    const visibleOrders = computed(() => {
        if (activeTab.value === 'All orders') {
            return orders;
        }

        return orders.filter(order => order.filters.includes(activeTab.value));
    });

    watch(activePage, page => activeTab.value = page.tabs[0]);
</script>

<style
    lang="scss"
    module>
    .dashboardSearch {
        width: 261px;
    }

    // The panel is a fixed column of its own, so its body is the part that scrolls.
    .sideBody {
        overflow-y: auto;
    }

    .dashboardMetrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 21px;
    }

    .dashboardMetric {
        display: flex;
        align-items: start;
        flex-flow: column;
        gap: 6px;
    }

    .dashboardMetricLabel {
        font-size: var(--font-size-small);
        color: var(--foreground-secondary);
    }

    .dashboardMetricValue {
        font-size: 27px;
        font-weight: 700;
        line-height: 1.2;
        color: var(--foreground-prominent);
    }
</style>
