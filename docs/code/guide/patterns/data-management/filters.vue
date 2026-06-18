<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="15">
            <FluxPane style="width: max-content; align-self: start">
                <FluxFilter v-model="filterState">
                    <FluxFilterOption
                        is-searchable
                        icon="circle-check"
                        label="Status"
                        name="status"
                        search-placeholder="Search status..."
                        :options="statuses"/>

                    <FluxFilterOptions
                        is-searchable
                        icon="clone"
                        label="Categories"
                        name="categories"
                        search-placeholder="Search categories..."
                        :options="categories"/>

                    <FluxSeparator/>

                    <FluxFilterOptionAsync
                        icon="hourglass-clock"
                        label="Owner"
                        name="owner"
                        search-placeholder="Search owners..."
                        :fetch-options="fetchOptions"
                        :fetch-relevant="fetchRelevant"
                        :fetch-search="fetchSearch"/>

                    <FluxFilterOptionsAsync
                        icon="hourglass-clock"
                        label="Collaborators"
                        name="collaborators"
                        search-placeholder="Search people..."
                        :fetch-options="fetchOptions"
                        :fetch-relevant="fetchRelevant"
                        :fetch-search="fetchSearch"/>

                    <FluxSeparator/>

                    <FluxFilterDate
                        icon="calendar"
                        label="Created"
                        name="created"/>

                    <FluxFilterDateRange
                        icon="calendar-range"
                        label="Period"
                        name="period"/>

                    <FluxFilterRange
                        icon="coin"
                        label="Price"
                        name="price"
                        :formatter="priceFormatter"
                        :max="1000"
                        :min="0"
                        :step="10"/>
                </FluxFilter>
            </FluxPane>

            <FluxPane>
                <FluxPaneBody>
                    Showing results for the selected filters.
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxPagination
                        arrows
                        :page="page"
                        :per-page="10"
                        :total="200"
                        @navigate="page = $event"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionRow, FluxFilterState } from '@flux-ui/types';
    import { FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptionAsync, FluxFilterOptions, FluxFilterOptionsAsync, FluxFilterRange, FluxPagination, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSeparator } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const page = ref(1);

    const statuses: FluxFilterOptionRow[] = [
        {label: 'Active', value: 'active'},
        {label: 'Draft', value: 'draft'},
        {label: 'Archived', value: 'archived'}
    ];

    const categories: FluxFilterOptionRow[] = [
        {label: 'Electronics', value: 'electronics'},
        {label: 'Clothing', value: 'clothing'},
        {label: 'Books', value: 'books'},
        {label: 'Home', value: 'home'}
    ];

    const people: FluxFilterOptionRow[] = [
        {label: 'Bas Milius', value: 'bas'},
        {label: 'Jane Doe', value: 'jane'},
        {label: 'John Doe', value: 'john'},
        {label: 'Mary Jane', value: 'mary'}
    ];

    const filterState = ref<FluxFilterState>({
        status: 'active',
        categories: ['electronics'],
        owner: 'bas',
        collaborators: ['jane', 'john'],
        created: DateTime.now(),
        period: [DateTime.now(), DateTime.now().plus({day: 14})],
        price: [250, 500]
    });

    async function fetchOptions(values: string[]): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 200));

        return people.filter(person => values.includes(person.value as string));
    }

    async function fetchRelevant(): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 200));

        return people;
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 200));

        return people.filter(person => person.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    function priceFormatter(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            maximumFractionDigits: 0,
            style: 'currency'
        }).format(value);
    }
</script>
