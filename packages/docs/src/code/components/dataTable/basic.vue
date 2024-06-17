<template>
    <FluxPane>
        <FluxDataTable
            :data-set="dataSet"
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
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxBadgeStack, FluxDataTable, FluxPane, FluxTableActions, FluxTableCell, FluxTableHeader } from '@basmilius/flux';
    import { computed } from 'vue';

    const dataSet = computed(() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));
</script>
