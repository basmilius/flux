<template>
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
                        <flux-action icon="pen"/>
                        <flux-action icon="ellipsis-h"/>
                    </flux-table-actions>
                </flux-table-cell>
            </template>
        </flux-data-table>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxAction,
        FluxBadge,
        FluxBadgeStack,
        FluxDataTable,
        FluxPane,
        FluxTableActions,
        FluxTableCell,
        FluxTableHeader
    } from '@fancee/flux';
    import { computed } from 'vue';

    const dataSet = computed(() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));
</script>
