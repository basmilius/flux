<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Action bar"/>

        <preview>
            <flux-pane>
                <flux-pane-header title="Filter"/>
                <flux-action-bar>
                    <template #primary>
                        <flux-primary-button
                            icon-before="circle-plus"
                            label="Event"/>
                    </template>

                    <template #filter>
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
                    </template>

                    <template #search>
                        <flux-form-input
                            type="search"
                            placeholder="Search anything..."/>
                    </template>
                </flux-action-bar>
                <flux-pane-body>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque neque nobis quasi recusandae reprehenderit. Ad amet, blanditiis, delectus dolorem dolorum error, esse expedita explicabo mollitia quam quia quisquam reiciendis temporibus?
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                Action bars are toolbars that can be used along data tables. They can show a primary action, a search bar
                and a filter button. Filters are commonly shown within a flyout that contains a window.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Slots">
                <template #body>
                    <tr>
                        <td><code>primary</code><code>{}</code></td>
                        <td>One primary action for the action bar. Yes, more is allowed, but strongly discouraged.</td>
                    </tr>
                    <tr>
                        <td><code>search</code><code>{}</code></td>
                        <td>A search bar for the action bar. Typically a form input.</td>
                    </tr>
                    <tr>
                        <td><code>filter</code><code>FluxFlyout:slots:default</code></td>
                        <td>The filter button. The same slot api of the default slot from Flyout is used.</td>
                    </tr>
                    <tr>
                        <td><code>filterOpener</code><code>FluxFlyout:slots:opener</code></td>
                        <td>The filter flyout. The same slot api of the opener slot from Flyout is used.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { FluxActionBar, FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptions, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';

    const filterState = ref({});
</script>
