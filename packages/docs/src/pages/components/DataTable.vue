<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Data table"/>

        <preview>
            <flux-pane>
                <flux-data-table
                    :data-set="dataSet"
                    :total="dataSet.length"
                    is-hoverable>
                    <template #header>
                        <flux-table-header>Name</flux-table-header>
                        <flux-table-header>Email</flux-table-header>
                        <flux-table-header is-shrinking>Status</flux-table-header>
                        <flux-table-header is-shrinking/>
                    </template>

                    <template #name="{row: {name}}">
                        <flux-table-cell>{{ name }}</flux-table-cell>
                    </template>

                    <template #email="{row: {email}}">
                        <flux-table-cell>{{ email }}</flux-table-cell>
                    </template>

                    <template #isActive="{row: {isActive}}">
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
            </flux-pane>
        </preview>

        <api-section>
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
        </api-section>

        <api-section title="API">
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
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A plain data table that displays a few rows."/>

            <api-example
                :code="paginationCode"
                :component="pagination"
                title="Paginated"
                description="For displaying large amounts of data, a pagination bar can be used."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack, FluxDataTable, FluxPane, FluxStack, FluxTableAction, FluxTableActions, FluxTableCell, FluxTableHeader } from '@fancee/flux';
    import { ApiExample, ApiSection, ApiTable, PageTitle, Preview } from '@/components';
    import { computed, ref } from 'vue';
    import basic from '../../code/components/data-table/basic.vue';
    import basicCode from '../../code/components/data-table/basic.vue?raw';
    import pagination from '../../code/components/data-table/pagination.vue';
    import paginationCode from '../../code/components/data-table/pagination.vue?raw';

    const dataSet = computed(() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));
</script>
