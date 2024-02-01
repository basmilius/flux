<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Filter"/>

        <Preview style="min-height: 420px">
            <FluxPane style="align-self: start; translate: 0 54px; width: max-content">
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

        <ApiSection>
            <p>
                A Filter is used to filter a large dataset. It consists of multiple filter options of various types, for
                example an option or a date. The user can navigate through the filter and alter options.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['angle-left', 'angle-right', 'circle-check', 'magnifying-glass', 'trash']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxFilter</code></td>
                    <td>The filter component itself, can render the other filter components.</td>
                </tr>
                <tr>
                    <td><code>FluxFilterDate</code></td>
                    <td>Filter option that can select a single date.</td>
                </tr>
                <tr>
                    <td><code>FluxFilterDateRange</code></td>
                    <td>Filter option that can select a date range.</td>
                </tr>
                <tr>
                    <td><code>FluxFilterOption</code></td>
                    <td>Filter option that can select a single item from a list of options.</td>
                </tr>
                <tr>
                    <td><code>FluxFilterOptionAsync</code></td>
                    <td>Filter option that can select a single item from a dynamic list of options.</td>
                </tr>
                <tr>
                    <td><code>FluxFilterOptions</code></td>
                    <td>Filter option that can select multiple items from a list of options.</td>
                </tr>
                <tr>
                    <td><code>FluxFilterOptionsAsync</code></td>
                    <td>Filter option that can select multiple items from a dynamic list of options.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Filter">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>object</code></td>
                        <td>The state of the filter.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>reset</code><code>(field: string): void;</code></td>
                        <td>Triggered when a single filter field needs to be reset.</td>
                    </tr>
                    <tr>
                        <td><code>update:model-value</code><code>(state: object): void;</code></td>
                        <td>Triggered when the filter state has changed.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Filter options and other components. A FluxSeparator has a special case that groups the other options.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterDate">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>DateTime</code></td>
                        <td>Maximum date that can be selected.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>DateTime</code></td>
                        <td>Minimum date that can be selected.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterDateRange">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>DateTime</code></td>
                        <td>Maximum date that can be selected.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>DateTime</code></td>
                        <td>Minimum date that can be selected.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                    <tr>
                        <td><code>range-mode</code><code>'range' | 'week' | 'month'</code></td>
                        <td>Type of range that can be selected in the date picker.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterOption">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>is-searchable</code><code>boolean</code></td>
                        <td>Enables a search bar within the list with options.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                    <tr>
                        <td><code>options</code><code>(FluxFilterOptionHeader | FluxFilterOptionItem)[]</code></td>
                        <td>The available options.</td>
                    </tr>
                    <tr>
                        <td><code>search-query</code><code>string</code></td>
                        <td>Search query that is visible in the search bar.</td>
                    </tr>
                    <tr>
                        <td><code>search-placeholder</code><code>string</code></td>
                        <td>Placeholder that is visible in the search bar.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:search-query</code><code>(searchQuery: string): void</code></td>
                        <td>Triggered when the search query changes.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterOptionAsync">
                <template #props>
                    <tr>
                        <td><code>fetch-options</code><code>(ids: string[]) => Promise&lt;(FluxFilterOptionHeader | FluxFilterOptionItem)[]&gt;</code></td>
                        <td>Function to call when the form select needs options by their id.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-relevant</code><code>() => Promise&lt;(FluxFilterOptionHeader | FluxFilterOptionItem)[]&gt;</code></td>
                        <td>Function to call when the form select needs relevant options.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-search</code><code>(searchQuery: string) => Promise&lt;(FluxFilterOptionHeader | FluxFilterOptionItem)[]&gt;</code></td>
                        <td>Function to call when the form select needs options based on the given search query.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                    <tr>
                        <td><code>search-query</code><code>string</code></td>
                        <td>Search query that is visible in the search bar.</td>
                    </tr>
                    <tr>
                        <td><code>search-placeholder</code><code>string</code></td>
                        <td>Placeholder that is visible in the search bar.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:search-query</code><code>(searchQuery: string): void</code></td>
                        <td>Triggered when the search query changes.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterOptions">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>is-searchable</code><code>boolean</code></td>
                        <td>Enables a search bar within the list with options.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                    <tr>
                        <td><code>options</code><code>(FluxFilterOptionHeader | FluxFilterOptionItem)[]</code></td>
                        <td>The available options.</td>
                    </tr>
                    <tr>
                        <td><code>search-query</code><code>string</code></td>
                        <td>Search query that is visible in the search bar.</td>
                    </tr>
                    <tr>
                        <td><code>search-placeholder</code><code>string</code></td>
                        <td>Placeholder that is visible in the search bar.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:search-query</code><code>(searchQuery: string): void</code></td>
                        <td>Triggered when the search query changes.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterOptionsAsync">
                <template #props>
                    <tr>
                        <td><code>fetch-options</code><code>(ids: string[]) => Promise&lt;(FluxFilterOptionHeader | FluxFilterOptionItem)[]&gt;</code></td>
                        <td>Function to call when the form select needs options by their id.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-relevant</code><code>() => Promise&lt;(FluxFilterOptionHeader | FluxFilterOptionItem)[]&gt;</code></td>
                        <td>Function to call when the form select needs relevant options.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-search</code><code>(searchQuery: string) => Promise&lt;(FluxFilterOptionHeader | FluxFilterOptionItem)[]&gt;</code></td>
                        <td>Function to call when the form select needs options based on the given search query.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                    <tr>
                        <td><code>search-query</code><code>string</code></td>
                        <td>Search query that is visible in the search bar.</td>
                    </tr>
                    <tr>
                        <td><code>search-placeholder</code><code>string</code></td>
                        <td>Placeholder that is visible in the search bar.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:search-query</code><code>(searchQuery: string): void</code></td>
                        <td>Triggered when the search query changes.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FilterRange">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the filter option.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>The name of the entry in the filter state.</td>
                    </tr>
                    <tr>
                        <td><code>formatter</code><code>(value: number) => string</code></td>
                        <td>Formats the number.</td>
                    </tr>
                    <tr>
                        <td><code>is-ticks-visible</code><code>boolean</code></td>
                        <td>Shows slider ticks.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>number</code></td>
                        <td>The maximum value.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>number</code></td>
                        <td>The minimum value.</td>
                    </tr>
                    <tr>
                        <td><code>step</code><code>number</code></td>
                        <td>The step between the min and max range.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:search</code><code>(searchQuery: string): void</code></td>
                        <td>Triggered when the search query changes.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="optionCode"
                :component="option"
                title="Single option"
                description="A filter where the user can select a single value."/>

            <ApiExample
                :code="optionsCode"
                :component="options"
                title="Multiple options"
                description="A filter where the user can select multiple values."/>

            <ApiExample
                :code="dateCode"
                :component="date"
                title="Date"
                description="A filter where the user can select a date."/>

            <ApiExample
                :code="dateRangeCode"
                :component="dateRange"
                title="Date"
                description="A filter where the user can select a date range."/>

            <ApiExample
                :code="optionAsyncCode"
                :component="optionAsync"
                title="Single option (Async)"
                description="A filter where the user can select a single value."/>

            <ApiExample
                :code="optionsAsyncCode"
                :component="optionsAsync"
                title="Multiple options (Async)"
                description="A filter where the user can select multiple values."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptionAsync, FluxFilterOptionRow, FluxFilterOptions, FluxFilterOptionsAsync, FluxFilterRange, FluxFilterState, FluxPane, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';
    import date from '@docs/code/components/filter/date.vue';
    import dateCode from '@docs/code/components/filter/date.vue?raw';
    import dateRange from '@docs/code/components/filter/dateRange.vue';
    import dateRangeCode from '@docs/code/components/filter/dateRange.vue?raw';
    import option from '@docs/code/components/filter/option.vue';
    import optionCode from '@docs/code/components/filter/option.vue?raw';
    import optionAsync from '@docs/code/components/filter/optionAsync.vue';
    import optionAsyncCode from '@docs/code/components/filter/optionAsync.vue?raw';
    import options from '@docs/code/components/filter/options.vue';
    import optionsCode from '@docs/code/components/filter/options.vue?raw';
    import optionsAsync from '@docs/code/components/filter/optionsAsync.vue';
    import optionsAsyncCode from '@docs/code/components/filter/optionsAsync.vue?raw';
    import dataset from '@docs/code/components/formSelect/dataset.json';

    async function fetchOptions(ids: string[]): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset
            .filter(o => ids.includes(o.id))
            .map(o => ({
                label: o.label,
                value: o.id
            }));
    }

    async function fetchRelevant(): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset
            .map(o => ({
                label: o.label,
                value: o.id
            }))
            .toSorted();
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        return dataset
            .filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(o => ({
                label: o.label,
                value: o.id
            }));
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
