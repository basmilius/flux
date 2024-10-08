<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Data table"/>

        <Preview>
            <FluxPane>
                <FluxDataTable
                    :data-set="dataSet"
                    :total="dataSet.length"
                    is-hoverable>
                    <template #header>
                        <FluxTableHeader
                            is-sortable
                            sort="ascending">
                            Name
                        </FluxTableHeader>
                        <FluxTableHeader is-sortable>Email</FluxTableHeader>
                        <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                        <FluxTableHeader is-shrinking/>
                    </template>

                    <template #name="{row: {name}}">
                        <FluxTableCell>{{ name }}</FluxTableCell>
                    </template>

                    <template #email="{row: {email}}">
                        <FluxTableCell>{{ email }}</FluxTableCell>
                    </template>

                    <template #isActive="{row: {isActive}}">
                        <FluxTableCell>
                            <FluxBadgeStack>
                                <FluxBadge
                                    v-if="isActive"
                                    color="success"
                                    icon="circle-check"
                                    label="Active"/>

                                <FluxBadge
                                    v-else
                                    color="danger"
                                    icon="circle-xmark"
                                    label="Inactive"/>
                            </FluxBadgeStack>
                        </FluxTableCell>
                    </template>

                    <template #actions="{}">
                        <FluxTableCell>
                            <FluxTableActions>
                                <FluxAction icon="pen"/>
                                <FluxAction icon="ellipsis-h"/>
                            </FluxTableActions>
                        </FluxTableCell>
                    </template>
                </FluxDataTable>
            </FluxPane>
        </Preview>

        <ApiSection>
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
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['arrow-down-a-z', 'arrow-up-a-z', 'arrow-up-arrow-down', 'circle-xmark']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="DataTable">
                <template #props>
                    <tr>
                        <td><code>data-set</code><code>object[]</code></td>
                        <td>The visible data set for the table.</td>
                    </tr>
                    <tr>
                        <td><code>is-bordered</code><code>boolean</code></td>
                        <td>Applies borders to all sides of the table cells.</td>
                    </tr>
                    <tr>
                        <td><code>is-hoverable</code><code>boolean</code></td>
                        <td>Adds a hover to each rows within the table body.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Indicates that the table is loading.</td>
                    </tr>
                    <tr>
                        <td><code>is-separated</code><code>boolean</code></td>
                        <td>Adds a border between each row in the table body.</td>
                    </tr>
                    <tr>
                        <td><code>is-striped</code><code>boolean</code></td>
                        <td>Adds alternating colors to each row in the table body.</td>
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

                <template #slots>
                    <tr>
                        <td><code>header</code><code>{dataSet, page, perPage, total}</code></td>
                        <td>The header of the data table.</td>
                    </tr>
                    <tr>
                        <td><code>[custom]</code><code>{dataSet, page, perPage, row, total}</code></td>
                        <td>A single cell within the data table.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A plain data table that displays a few rows."/>

            <ApiExample
                :code="paginationCode"
                :component="pagination"
                title="Paginated"
                description="For displaying large amounts of data, a pagination bar can be used."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxBadgeStack, FluxDataTable, FluxPane, FluxStack, FluxTableActions, FluxTableCell, FluxTableHeader } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import { computed } from 'vue';
    import basic from '@/code/components/dataTable/basic.vue';
    import basicCode from '@/code/components/dataTable/basic.vue?raw';
    import pagination from '@/code/components/dataTable/pagination.vue';
    import paginationCode from '@/code/components/dataTable/pagination.vue?raw';

    const dataSet = computed(() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@flux.bas.dev`,
        isActive: index % 2 === 0
    })));
</script>
