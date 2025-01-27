---
outline: deep

requiredIcons:
    - arrow-down-a-z
    - arrow-up-a-z
    - arrow-up-arrow-down
    - circle-xmark
---

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxBadgeStack, FluxDataTable, FluxPane, FluxStack, FluxTableActions, FluxTableCell, FluxTableHeader } from '@basmilius/flux';
    import { computed } from 'vue';

    const dataSet = computed(() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@flux.bas.dev`,
        isActive: index % 2 === 0
    })));
</script>

# Data table

Data tables are a powerful tool for organizing and presenting large sets of data in a structured and easy-to-read format. Like traditional tables, data tables use rows and columns to organize data, but they also offer additional functionality and features that are specifically designed for working with large datasets.

One of the key benefits of using data tables is their ability to handle large amounts of data, making them an ideal choice for applications that require data visualization and analysis. Data tables often include advanced sorting and filtering capabilities, allowing users to quickly search and analyze data based on specific criteria.

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

<FrontmatterDocs/>

## Examples

### Basic

### Paginated

## Used components

- [Table](./table/base)
- [Table row](./table/row)
