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

                    <FluxFilterDate
                        icon="calendar"
                        label="Date"
                        name="option3"/>

                    <FluxFilterDateRange
                        icon="calendar-range"
                        label="Period"
                        name="option4"/>
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
                    <td><code>FluxFilterOptions</code></td>
                    <td>Filter option that can select multiple items from a list of options.</td>
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
                        <td><code>search</code><code>string</code></td>
                        <td>Search query that is visible in the search bar.</td>
                    </tr>
                    <tr>
                        <td><code>search-placeholder</code><code>string</code></td>
                        <td>Placeholder that is visible in the search bar.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:search</code><code>(searchQuery: string): void</code></td>
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
                        <td><code>search</code><code>string</code></td>
                        <td>Search query that is visible in the search bar.</td>
                    </tr>
                    <tr>
                        <td><code>search-placeholder</code><code>string</code></td>
                        <td>Placeholder that is visible in the search bar.</td>
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
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptions, FluxPane, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';
    import date from '@/code/components/filter/date.vue';
    import dateCode from '@/code/components/filter/date.vue?raw';
    import dateRange from '@/code/components/filter/dateRange.vue';
    import dateRangeCode from '@/code/components/filter/dateRange.vue?raw';
    import option from '@/code/components/filter/option.vue';
    import optionCode from '@/code/components/filter/option.vue?raw';
    import options from '@/code/components/filter/options.vue';
    import optionsCode from '@/code/components/filter/options.vue?raw';

    const filterState = ref({
        option1: 'b',
        option2: ['a', 'c'],
        option3: DateTime.now(),
        option4: [DateTime.now(), DateTime.now().plus({day: 14})]
    });
</script>
