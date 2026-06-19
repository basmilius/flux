<template>
    <FluxApplicationContent layout="full">
        <FluxDataTable
            is-hoverable
            is-sticky
            :fill-columns="6"
            :items="visibleItems"
            :limits="[10, 25, 50]"
            :page="page"
            :per-page="perPage"
            :total="filteredItems.length"
            @limit="value => perPage = value"
            @navigate="value => page = value">
            <template #filter>
                <FluxTableBar>
                    <FluxFilterBar
                        v-model="filterState"
                        v-model:search="search"
                        is-searchable
                        search-placeholder="Search clients...">
                        <FluxFilterOption
                            icon="circle-check"
                            label="Status"
                            name="status"
                            :options="statusOptions"/>
                        <FluxFilterOptionsAsync
                            :fetch-options="fetchIndustryOptions"
                            :fetch-relevant="fetchRelevantIndustries"
                            :fetch-search="fetchSearchIndustries"
                            icon="tag"
                            label="Industry"
                            name="industry"/>
                        <FluxFilterOptionAsync
                            :fetch-options="fetchCountryOptions"
                            :fetch-relevant="fetchRelevantCountries"
                            :fetch-search="fetchSearchCountries"
                            icon="location-dot"
                            label="Country"
                            name="country"/>
                    </FluxFilterBar>
                </FluxTableBar>
            </template>

            <template #header>
                <FluxTableHeader>Client</FluxTableHeader>
                <FluxTableHeader>Industry</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                <FluxTableHeader is-shrinking>Projects</FluxTableHeader>
                <FluxTableHeader is-shrinking>Since</FluxTableHeader>
                <FluxTableHeader is-shrinking/>
            </template>

            <template #client="{item}">
                <FluxTableCell>
                    <RouterLink
                        class="client-name"
                        :to="{name: 'client', params: {id: item.id}}">
                        <FluxBoxedIcon
                            :color="item.color"
                            name="building"/>
                        <div class="client-name-info">
                            <strong>{{ item.name }}</strong>
                            <small>{{ item.contactName }}</small>
                        </div>
                    </RouterLink>
                </FluxTableCell>
            </template>

            <template #industry="{item}">
                <FluxTableCell>
                    <FluxChip :label="item.industry"/>
                </FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <StatusBadge :meta="CLIENT_STATUS[item.status]"/>
                </FluxTableCell>
            </template>

            <template #projects="{item}">
                <FluxTableCell>{{ projectsForClient(item.id).length }}</FluxTableCell>
            </template>

            <template #since="{item}">
                <FluxTableCell>{{ item.since.toFormat('LLL yyyy') }}</FluxTableCell>
            </template>

            <template #actions="{item}">
                <FluxTableCell>
                    <FluxTableActions>
                        <FluxTooltip content="Open client">
                            <FluxAction
                                icon="arrow-right"
                                type="route"
                                :to="{name: 'client', params: {id: item.id}}"/>
                        </FluxTooltip>
                    </FluxTableActions>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxAction, FluxBoxedIcon, FluxChip, FluxDataTable, FluxFilterBar, FluxFilterOption, FluxFilterOptionAsync, FluxFilterOptionsAsync, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTooltip } from '@flux-ui/components';
    import type { FluxFilterOptionRow, FluxFilterState, FluxFilterValue } from '@flux-ui/types';
    import { computed, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { defineTitle } from '@/composable';
    import { useClientsStore } from '@/store';
    import { CLIENT_STATUS } from '@/util';

    defineTitle('handshake', 'Clients');

    const {clients, projectsForClient} = useClientsStore();

    const search = ref('');
    const filterState = ref<FluxFilterState>({status: null, industry: [], country: null});
    const page = ref(1);
    const perPage = ref(10);

    const statusOptions = [
        {label: 'Lead', value: 'lead'},
        {label: 'Active', value: 'active'},
        {label: 'Churned', value: 'churned'}
    ];

    const industries = computed(() => [...new Set(clients.value.map(client => client.industry))].sort());
    const countries = computed(() => [...new Set(clients.value.map(client => client.country))].sort());

    function delay(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 200));
    }

    function toRows(values: string[]): FluxFilterOptionRow[] {
        return values.map(value => ({label: value, value}));
    }

    async function fetchRelevantIndustries(): Promise<FluxFilterOptionRow[]> {
        await delay();
        return toRows(industries.value);
    }

    async function fetchSearchIndustries(query: string): Promise<FluxFilterOptionRow[]> {
        await delay();
        return toRows(industries.value.filter(value => value.toLowerCase().includes(query.toLowerCase())));
    }

    async function fetchIndustryOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]> {
        return toRows(ids.map(String));
    }

    async function fetchRelevantCountries(): Promise<FluxFilterOptionRow[]> {
        await delay();
        return toRows(countries.value.slice(0, 10));
    }

    async function fetchSearchCountries(query: string): Promise<FluxFilterOptionRow[]> {
        await delay();
        return toRows(countries.value.filter(value => value.toLowerCase().includes(query.toLowerCase())));
    }

    async function fetchCountryOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]> {
        return toRows(ids.map(String));
    }

    const filteredItems = computed(() => clients.value.filter(client => {
        const {status, industry, country} = filterState.value;
        const matchesStatus = status === null || client.status === status;
        const matchesIndustry = !Array.isArray(industry) || industry.length === 0 || industry.includes(client.industry);
        const matchesCountry = country === null || country === undefined || client.country === country;
        const matchesSearch = search.value === '' || client.name.toLowerCase().includes(search.value.toLowerCase());
        return matchesStatus && matchesIndustry && matchesCountry && matchesSearch;
    }));

    const visibleItems = computed(() => filteredItems.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));
</script>

<style scoped>
    .client-name {
        display: flex;
        align-items: center;
        gap: 12px;
        color: inherit;
        text-decoration: none;
    }

    .client-name-info {
        display: flex;
        flex-flow: column;
        gap: 2px;
    }

    .client-name-info small {
        color: var(--gray-500);
    }
</style>
