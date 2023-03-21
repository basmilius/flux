<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Filter"/>

        <preview style="min-height: 420px">
            <flux-pane style="align-self: start; translate: 0 54px; width: 330px">
                <flux-filter v-model="filterState">
                    <flux-filter-option
                        icon="clone"
                        label="Option"
                        name="option1"
                        :options="[
                            {label: 'Option A', value: 'a'},
                            {label: 'Option B', value: 'b'},
                            {label: 'Option C', value: 'c'}
                        ]"/>

                    <flux-filter-options
                        icon="circle-check"
                        label="Choices"
                        name="option2"
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

        <section>
            <p>
                A Filter is used to filter a large dataset. It consists of multiple filter options of various types, for
                example an option or a date. The user can navigate through the filter and alter options.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Components">
                <template #head>
                    <tr>
                        <th>Name</th>
                        <th>When to use</th>
                    </tr>
                </template>
                <template #body>
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
                </template>
            </api-table>

            <api-table title="Props: FluxFilter">
                <template #body>
                    <tr>
                        <td><code>model-value</code><code>object</code></td>
                        <td>The state of the filter.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxFilterDate">
                <template #body>
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
            </api-table>

            <api-table title="Props: FluxFilterDateRange">
                <template #body>
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
            </api-table>

            <api-table title="Props: FluxFilterOption">
                <template #body>
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
                        <td><code>options</code><code>FluxFilterOptionItem[]</code></td>
                        <td>The available options.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxFilterOptions">
                <template #body>
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
                        <td><code>options</code><code>FluxFilterOptionItem[]</code></td>
                        <td>The available options.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits: FluxFilter">
                <template #body>
                    <tr>
                        <td><code>update:model-value</code><code>(state: object): void;</code></td>
                        <td>Triggered when the filter state has changed.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxFilter">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Filter options and other components. A FluxSeparator has a special case that groups the other options.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptions, FluxPane, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiTable, PageTitle, Preview } from '@/components';
    import { DateTime } from 'luxon';

    const filterState = ref({
        option1: 'b',
        option2: ['a', 'c'],
        option3: DateTime.now(),
        option4: [DateTime.now(), DateTime.now().plus({day: 14})]
    });
</script>
