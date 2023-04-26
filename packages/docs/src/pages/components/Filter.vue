<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Filter"/>

        <preview style="min-height: 420px">
            <flux-pane style="align-self: start; translate: 0 54px; width: 330px">
                <flux-filter v-model="filterState">
                    <flux-filter-option
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

                    <flux-filter-options
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

                    <flux-separator/>

                    <flux-filter-date
                        icon="calendar"
                        label="Date"
                        name="option3"/>

                    <flux-filter-date-range
                        icon="calendar-range"
                        label="Period"
                        name="option4"/>
                </flux-filter>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A Filter is used to filter a large dataset. It consists of multiple filter options of various types, for
                example an option or a date. The user can navigate through the filter and alter options.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['angle-left', 'angle-right', 'circle-check', 'magnifying-glass', 'trash']"/>
        </api-section>

        <api-section title="API">
            <api-components>
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
            </api-components>

            <api-component name="FluxFilter">
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
            </api-component>

            <api-component name="FluxFilterDate">
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
            </api-component>

            <api-component name="FluxFilterDateRange">
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
            </api-component>

            <api-component name="FluxFilterOption">
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
                        <td><code>options</code><code>FluxFilterOptionItem[]</code></td>
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
            </api-component>

            <api-component name="FluxFilterOptions">
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
                        <td><code>options</code><code>FluxFilterOptionItem[]</code></td>
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
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptions, FluxPane, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref({
        option1: 'b',
        option2: ['a', 'c'],
        option3: DateTime.now(),
        option4: [DateTime.now(), DateTime.now().plus({day: 14})]
    });
</script>
