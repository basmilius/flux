<template>
    <FluxApplication show-desktop-menu-toggle>
        <template #menu>
            <FluxApplicationMenu>
                <template #header>
                    <FluxMenuGroup is-horizontal>
                        <FluxApplicationMenuAccount
                            icon="cubes"
                            label="Harbor Freight"/>

                        <FluxApplicationMenuToggle/>
                    </FluxMenuGroup>

                    <FluxApplicationMenuContextSwitcher/>
                </template>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="gauge"
                        :is-active="routeName === 'overview'"
                        label="Overview"
                        @click="router.push({name: 'overview'})"/>

                    <FluxMenuItem
                        icon-leading="truck"
                        :is-active="routeName.startsWith('lane')"
                        label="Lane RTM-HAM"
                        @click="router.push({name: 'lane'})"/>

                    <FluxMenuItem
                        icon-leading="building"
                        label="Carriers"/>

                    <FluxMenuItem
                        icon-leading="chart-line"
                        label="Reports"/>
                </FluxMenuGroup>

                <template #context>
                    <FluxApplicationMenuContextStack/>
                </template>
            </FluxApplicationMenu>
        </template>

        <FluxApplicationTop
            :icon="page.icon"
            :title="page.title"/>

        <FluxApplicationContent layout="default">
            <FluxApplicationPageHeader
                :description="page.description"
                :title="page.title"/>

            <FluxApplicationSection
                v-if="routeName === 'overview'"
                info="Three lanes, one of which has a context menu in this playground"
                title="Freight lanes">
                <FluxPane>
                    <FluxTable is-hoverable>
                        <template #header>
                            <FluxTableRow>
                                <FluxTableHeader :min-width="165">Lane</FluxTableHeader>
                                <FluxTableHeader :min-width="210">Route</FluxTableHeader>
                                <FluxTableHeader :min-width="150">Departures</FluxTableHeader>
                                <FluxTableHeader :min-width="150">Status</FluxTableHeader>
                            </FluxTableRow>
                        </template>

                        <FluxTableRow
                            v-for="lane of lanes"
                            :key="lane.code"
                            is-clickable
                            @click="lane.code === 'RTM-HAM' && router.push({name: 'lane'})">
                            <FluxTableCell>
                                <strong>{{ lane.code }}</strong>
                            </FluxTableCell>

                            <FluxTableCell>{{ lane.route }}</FluxTableCell>
                            <FluxTableCell>{{ lane.departures }}</FluxTableCell>

                            <FluxTableCell>
                                <FluxBadge
                                    :color="lane.color"
                                    dot
                                    :label="lane.status"/>
                            </FluxTableCell>
                        </FluxTableRow>
                    </FluxTable>
                </FluxPane>
            </FluxApplicationSection>

            <FluxApplicationSection
                v-else-if="routeName === 'lane'"
                info="Rolling four weeks"
                title="Performance">
                <FluxPane>
                    <FluxPaneBody>
                        <FluxDescriptionList>
                            <FluxDescriptionItem
                                icon="truck"
                                label="Departures per week">
                                14
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="stopwatch"
                                label="Average transit">
                                11h 40m
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="circle-check"
                                label="On time">
                                <FluxBadge
                                    color="success"
                                    label="97.1%"/>
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="money-bill"
                                label="Cost per pallet">
                                € 84.20
                            </FluxDescriptionItem>
                        </FluxDescriptionList>
                    </FluxPaneBody>
                </FluxPane>
            </FluxApplicationSection>

            <FluxApplicationSection
                v-else
                info="Valid until 31 December 2026"
                title="Rate cards">
                <FluxPane>
                    <FluxTable>
                        <template #header>
                            <FluxTableRow>
                                <FluxTableHeader :min-width="210">Service</FluxTableHeader>
                                <FluxTableHeader :min-width="150">Transit</FluxTableHeader>

                                <FluxTableHeader
                                    align="end"
                                    is-numeric
                                    :min-width="135">
                                    Rate
                                </FluxTableHeader>
                            </FluxTableRow>
                        </template>

                        <FluxTableRow
                            v-for="rate of rates"
                            :key="rate.service">
                            <FluxTableCell>{{ rate.service }}</FluxTableCell>
                            <FluxTableCell>{{ rate.transit }}</FluxTableCell>
                            <FluxTableCell>{{ rate.price }}</FluxTableCell>
                        </FluxTableRow>
                    </FluxTable>
                </FluxPane>
            </FluxApplicationSection>
        </FluxApplicationContent>
    </FluxApplication>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplication, FluxApplicationContent, FluxApplicationMenu, FluxApplicationMenuAccount, FluxApplicationMenuContextStack, FluxApplicationMenuContextSwitcher, FluxApplicationMenuToggle, FluxApplicationPageHeader, FluxApplicationSection, FluxApplicationTop } from '@flux-ui/application';
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, provide, shallowReactive } from 'vue';
    import { createMemoryHistory, createRouter, type RouteLocationNormalizedLoaded, type RouteRecordRaw, routeLocationKey, routerKey, routerViewLocationKey, START_LOCATION } from 'vue-router';
    import LaneMenu from './context/LaneMenu.vue';
    import RatesMenu from './context/RatesMenu.vue';

    const PAGES = {
        'overview': {
            description: 'Every lane Harbor Freight books capacity on.',
            icon: 'gauge',
            title: 'Overview'
        },
        'lane': {
            description: 'A single lane, with its own menu level in the rail.',
            icon: 'truck',
            title: 'Lane RTM-HAM'
        },
        'lane.rates': {
            description: 'The rate cards of this lane, one level deeper again.',
            icon: 'money-bill',
            title: 'Rates'
        }
    } as const satisfies Record<string, {
        readonly description: string;
        readonly icon: FluxIconName;
        readonly title: string;
    }>;

    const routes: RouteRecordRaw[] = [
        {
            path: '/',
            name: 'overview',
            children: [
                {
                    path: 'lanes/rtm-ham',
                    name: 'lane',
                    components: {menu: LaneMenu},
                    children: [
                        {
                            path: 'rates',
                            name: 'lane.rates',
                            components: {menu: RatesMenu}
                        }
                    ]
                }
            ]
        }
    ];

    const lanes = [
        {code: 'RTM-HAM', color: 'success', departures: '14 per week', route: 'Rotterdam to Hamburg', status: 'On schedule'},
        {code: 'RTM-ANR', color: 'success', departures: '21 per week', route: 'Rotterdam to Antwerp', status: 'On schedule'},
        {code: 'RTM-LIL', color: 'warning', departures: '6 per week', route: 'Rotterdam to Lille', status: 'Capacity tight'}
    ] satisfies readonly {
        readonly code: string;
        readonly color: FluxColor;
        readonly departures: string;
        readonly route: string;
        readonly status: string;
    }[];

    const rates = [
        {price: '€ 84.20', service: 'Pallet freight', transit: '1 day'},
        {price: '€ 1,240.00', service: 'Full truck load', transit: '1 day'},
        {price: '€ 312.50', service: 'Part load', transit: '2 days'},
        {price: '€ 1,980.00', service: 'Express, same day', transit: '12 hours'}
    ];

    const router = createRouter({
        history: createMemoryHistory(),
        routes
    });

    // `app.use(router)` would hand these three injections to the whole docs site and register
    // RouterLink and RouterView globally. This shell only needs them on its own subtree, so it
    // provides exactly what vue-router's install provides, and nothing else.
    const reactiveRoute = {} as Record<string, unknown>;

    for (const key in START_LOCATION) {
        Object.defineProperty(reactiveRoute, key, {
            enumerable: true,
            get: () => router.currentRoute.value[key as keyof RouteLocationNormalizedLoaded]
        });
    }

    provide(routerKey, router);
    provide(routeLocationKey, shallowReactive(reactiveRoute) as unknown as RouteLocationNormalizedLoaded);
    provide(routerViewLocationKey, router.currentRoute);

    const routeName = computed(() => String(router.currentRoute.value.name ?? 'overview'));
    const page = computed(() => PAGES[routeName.value as keyof typeof PAGES] ?? PAGES.overview);

    router.replace('/lanes/rtm-ham/rates');
</script>
