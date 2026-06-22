<template>
    <FluxApplicationContent layout="full">
        <FluxDataTable
            is-hoverable
            is-sticky
            :fill-columns="7"
            :items="visibleRows"
            :limits="[25, 50, 100]"
            :page="page"
            :per-page="perPage"
            :total="filteredRows.length"
            @limit="value => perPage = value"
            @navigate="value => pageNumber = value">
            <template #filter>
                <FluxTableBar>
                    <FluxFilterBar
                        v-model="filterState"
                        v-model:search="search"
                        is-searchable
                        search-placeholder="Search by page path…">
                        <FluxFilterOptions
                            icon="bolt"
                            label="Event"
                            name="event"
                            :options="eventOptions"/>
                        <FluxFilterOptions
                            icon="share-nodes"
                            label="Channel"
                            name="channel"
                            :options="channelOptions"/>
                        <FluxFilterOption
                            icon="desktop"
                            label="Device"
                            name="device"
                            :options="deviceOptions"/>
                        <FluxFilterOptionAsync
                            :fetch-options="fetchCountryOptions"
                            :fetch-relevant="fetchRelevantCountries"
                            :fetch-search="fetchSearchCountries"
                            icon="globe"
                            label="Country"
                            name="country"/>
                    </FluxFilterBar>
                </FluxTableBar>
            </template>

            <template #header>
                <FluxTableHeader is-shrinking>Time</FluxTableHeader>
                <FluxTableHeader is-shrinking>Event</FluxTableHeader>
                <FluxTableHeader>Page</FluxTableHeader>
                <FluxTableHeader is-shrinking>Channel</FluxTableHeader>
                <FluxTableHeader is-shrinking>Country</FluxTableHeader>
                <FluxTableHeader is-shrinking>Device</FluxTableHeader>
                <FluxTableHeader is-shrinking>Value</FluxTableHeader>
            </template>

            <template #time="{item}">
                <FluxTableCell>{{ item.timestamp.toFormat('LLL d · HH:mm') }}</FluxTableCell>
            </template>

            <template #event="{item}">
                <FluxTableCell>
                    <FluxBadge
                        :color="EVENT[item.event].color"
                        :icon="EVENT[item.event].icon"
                        :label="EVENT[item.event].label"/>
                </FluxTableCell>
            </template>

            <template #page="{item}">
                <FluxTableCell><code>{{ item.page }}</code></FluxTableCell>
            </template>

            <template #channel="{item}">
                <FluxTableCell>{{ CHANNEL[item.channel].label }}</FluxTableCell>
            </template>

            <template #country="{item}">
                <FluxTableCell>{{ item.country }}</FluxTableCell>
            </template>

            <template #device="{item}">
                <FluxTableCell>
                    <span class="device">
                        <FluxIcon :name="DEVICE[item.device].icon"/>
                        {{ DEVICE[item.device].label }}
                    </span>
                </FluxTableCell>
            </template>

            <template #value="{item}">
                <FluxTableCell>{{ item.value > 0 ? formatCurrency(item.value) : '—' }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBadge, FluxDataTable, FluxFilterBar, FluxFilterOption, FluxFilterOptionAsync, FluxFilterOptions, FluxIcon, FluxTableBar, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import type { FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterState, FluxFilterValue } from '@flux-ui/types';
    import { computed, ref } from 'vue';
    import { defineTitle } from '@/composable';
    import { useAnalyticsStore } from '@/store';
    import type { Channel, DeviceType, EventName } from '@/types';
    import { CHANNEL, DEVICE, EVENT, formatCurrency } from '@/util';

    defineTitle('table-cells', 'Explorer');

    const {eventLog} = useAnalyticsStore();

    const pageNumber = ref(1);
    const perPage = ref(25);
    const search = ref('');
    const filterState = ref<FluxFilterState>({event: [], channel: [], device: null, country: null});

    const page = computed(() => pageNumber.value);

    const eventOptions: FluxFilterOptionItem[] = (Object.keys(EVENT) as EventName[]).map(event => ({label: EVENT[event].label, value: event, icon: EVENT[event].icon}));
    const channelOptions: FluxFilterOptionItem[] = (Object.keys(CHANNEL) as Channel[]).map(channel => ({label: CHANNEL[channel].label, value: channel, icon: CHANNEL[channel].icon}));
    const deviceOptions: FluxFilterOptionItem[] = (Object.keys(DEVICE) as DeviceType[]).map(device => ({label: DEVICE[device].label, value: device, icon: DEVICE[device].icon}));

    const countries = computed(() => [...new Set(eventLog.value.map(row => row.country))].sort());

    function delay(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 200));
    }

    function toRows(values: string[]): FluxFilterOptionRow[] {
        return values.map(value => ({label: value, value}));
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

    const filteredRows = computed(() => eventLog.value.filter(row => {
        const {event, channel, device, country} = filterState.value;
        const matchesEvent = !Array.isArray(event) || event.length === 0 || event.includes(row.event);
        const matchesChannel = !Array.isArray(channel) || channel.length === 0 || channel.includes(row.channel);
        const matchesDevice = device === null || device === undefined || row.device === device;
        const matchesCountry = country === null || country === undefined || row.country === country;
        const matchesSearch = search.value === '' || row.page.toLowerCase().includes(search.value.toLowerCase());
        return matchesEvent && matchesChannel && matchesDevice && matchesCountry && matchesSearch;
    }));

    const visibleRows = computed(() => filteredRows.value.slice((pageNumber.value - 1) * perPage.value, pageNumber.value * perPage.value));
</script>

<style scoped>
    .device {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
</style>
