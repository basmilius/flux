<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Data table"/>

        <preview>
            <flux-pane>
                <flux-action-bar>
                    <template #primary>
                        <flux-primary-button
                            icon-before="circle-plus"
                            label="Event"/>
                    </template>

                    <template #filter>
                        <flux-pane-body>
                            Filter contents.
                        </flux-pane-body>
                    </template>

                    <template #search>
                        <flux-form-input
                            type="search"
                            placeholder="Search anything..."/>
                    </template>
                </flux-action-bar>

                <flux-data-table
                    :data-set="dataSet.slice((page - 1) * perPage, (page * perPage))"
                    :page="page"
                    :per-page="perPage"
                    :total="dataSet.length"
                    is-hoverable>
                    <template #header>
                        <flux-table-header>Name</flux-table-header>
                        <flux-table-header>Email</flux-table-header>
                        <flux-table-header is-shrinking>Status</flux-table-header>
                        <flux-table-header is-shrinking/>
                    </template>

                    <template #name="{name}">
                        <flux-table-cell>{{ name }}</flux-table-cell>
                    </template>

                    <template #email="{email}">
                        <flux-table-cell>{{ email }}</flux-table-cell>
                    </template>

                    <template #isActive="{isActive}">
                        <flux-table-cell>
                            <flux-badge-stack>
                                <flux-badge
                                    v-if="isActive"
                                    color="success"
                                    icon="circle-check"
                                    label="Active"/>


                                <flux-badge
                                    v-else
                                    color="danger"
                                    icon="circle-xmark"
                                    label="Inactive"/>
                            </flux-badge-stack>
                        </flux-table-cell>
                    </template>

                    <template #actions="{}">
                        <flux-table-cell>
                            <flux-table-actions>
                                <flux-table-action icon="pen"/>
                                <flux-table-action icon="ellipsis-h"/>
                            </flux-table-actions>
                        </flux-table-cell>
                    </template>
                </flux-data-table>
                <flux-pane-footer>
                    <flux-pagination-bar
                        :page="page"
                        :per-page="perPage"
                        :total="dataSet.length"
                        @limit="setPerPage"
                        @navigate="setPage"/>
                </flux-pane-footer>
            </flux-pane>
        </preview>

        <section>
            <p>
                Data tables are a powerful tool for organizing and presenting large sets of data in a structured
                and easy-to-read format. Like traditional tables, data tables use rows and columns to organize data,
                but they also offer additional functionality and features that are specifically designed for working
                with large datasets.
            </p>
            <p>
                One of the key benefits of using data tables is their ability to handle large amounts of data, making
                them an ideal choice for applications that require data visualization and analysis. Data tables often
                include advanced sorting and filtering capabilities, allowing users to quickly search and analyze data
                based on specific criteria.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>data-set</code><code>object[]</code></td>
                        <td>The visible data set for the table.</td>
                    </tr>
                    <tr>
                        <td><code>is-hoverable</code><code>boolean</code></td>
                        <td>When provided, the table rows will have a hover state when hovered.</td>
                    </tr>
                    <tr>
                        <td><code>page</code><code>number</code></td>
                        <td>The current page.</td>
                    </tr>
                    <tr>
                        <td><code>per-page</code><code>number</code></td>
                        <td>The amount of rows visible per page.</td>
                    </tr>
                    <tr>
                        <td><code>total</code><code>number</code></td>
                        <td>The total number of items in the entire data set.</td>
                    </tr>
                    <tr>
                        <td><code>unique-key</code><code>string</code></td>
                        <td>When given, this value of the object will be used as the key for each row.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxBadge, FluxBadgeStack, FluxDataTable, FluxFormInput, FluxPaginationBar, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxStack, FluxTableAction, FluxTableActions, FluxTableCell, FluxTableHeader } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
    import { computed, ref } from 'vue';

    const dataSet = computed(() => Array(95).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));

    const page = ref(1);
    const perPage = ref(5);

    function setPage(p: number): void {
        page.value = p;
    }

    function setPerPage(limit: number): void {
        perPage.value = limit;
    }
</script>
