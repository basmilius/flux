<template>
    <FluxPane>
        <FluxDataTable
            :data-set="dataSet.slice((page - 1) * perPage, (page * perPage))"
            :page="page"
            :per-page="perPage"
            :total="dataSet.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader>Email</FluxTableHeader>
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

        <FluxPaneFooter>
            <FluxPaginationBar
                :limits="[5, 10, 25, 50, 100]"
                :page="page"
                :per-page="perPage"
                :total="dataSet.length"
                @limit="limit => perPage = limit"
                @navigate="p => page = p"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxBadgeStack, FluxDataTable, FluxPaginationBar, FluxPane, FluxPaneFooter, FluxTableActions, FluxTableCell, FluxTableHeader } from '@fancee/flux';
    import { computed, ref } from 'vue';

    const dataSet = computed(() => Array(500).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));

    const page = ref(1);
    const perPage = ref(10);
</script>
