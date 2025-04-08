<template>
    <Preview>
        <FluxPane style="width: max-content; align-self: start">
            <FluxFilter v-model="filterState">
                <FluxFilterOption
                    is-searchable
                    icon="clone"
                    label="Option"
                    name="option1"
                    search-placeholder="Search options..."
                    :options="[
                            {label: 'Option A', value: 'a'},
                            {label: 'Option B', value: 'b'},
                            {label: 'Option C', value: 'c'}
                        ]"/>

                <FluxFilterOptions
                    is-searchable
                    icon="circle-check"
                    label="Choices"
                    name="option2"
                    search-placeholder="Search options..."
                    :options="[
                            {label: 'Option A', value: 'a'},
                            {label: 'Option B', value: 'b'},
                            {label: 'Option C', value: 'c'}
                        ]"/>

                <FluxSeparator/>

                <FluxFilterOptionAsync
                    icon="hourglass-clock"
                    label="Option (Async)"
                    name="option6"
                    search-placeholder="Search async options..."
                    :fetch-options="fetchOptions"
                    :fetch-relevant="fetchRelevant"
                    :fetch-search="fetchSearch"/>

                <FluxFilterOptionsAsync
                    icon="hourglass-clock"
                    label="Choices (Async)"
                    name="option7"
                    search-placeholder="Search async options..."
                    :fetch-options="fetchOptions"
                    :fetch-relevant="fetchRelevant"
                    :fetch-search="fetchSearch"/>

                <FluxSeparator/>

                <FluxFilterDate
                    icon="calendar"
                    label="Date"
                    name="option3"/>

                <FluxFilterDateRange
                    icon="calendar-range"
                    label="Period"
                    name="option4"/>

                <FluxSeparator/>

                <FluxFilterRange
                    icon="coin"
                    label="Cost"
                    name="option5"
                    :formatter="rangeFormatter"
                    :max="1000"
                    :min="0"
                    :step="10"/>
            </FluxFilter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptionAsync, FluxFilterOptionRow, FluxFilterOptions, FluxFilterOptionsAsync, FluxFilterRange, FluxFilterState, FluxPane, FluxSeparator } from '@flux-ui/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';
    import dataset from '../../../../assets/select-dataset.json' with { type: 'json' };

    async function fetchOptions(values: string[]): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset.filter(o => values.includes(o.value));
    }

    async function fetchRelevant(): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset.toSorted();
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const filterState = ref<FluxFilterState>({
        option1: 'b',
        option2: ['a', 'c'],
        option3: DateTime.now(),
        option4: [DateTime.now(), DateTime.now().plus({day: 14})],
        option5: [250, 500],
        option6: '73c83353-de92-8110-9bce-c2a9e8c0de64',
        option7: ['73c83353-de92-8110-9bce-c2a9e8c0de64', '92f99357-7fe5-71eb-74e2-55e057607e16'],

        get resettable(): string[] {
            return ['option2'];
        },

        reset(): void {
        }
    });

    function rangeFormatter(value: number): string {
        const formatter = new Intl.NumberFormat(navigator.language, {
            currency: 'EUR',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency'
        });

        return formatter.format(value / 100);
    }
</script>
