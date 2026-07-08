<template>
    <FluxFilterBar
        v-model="filterState"
        v-model:search="search"
        is-searchable
        search-placeholder="Search items...">
        <template #start>
            <FluxSecondaryButton
                icon-leading="arrow-down-to-line"
                label="Export"/>
        </template>

        <FluxFilterOption
            icon="circle-check"
            label="Status"
            name="status"
            :options="[
                {label: 'Active', value: 'active'},
                {label: 'Inactive', value: 'inactive'},
                {label: 'Pending', value: 'pending'}
            ]"/>

        <FluxFilterOption
            icon="clone"
            label="Category"
            name="category"
            :options="[
                {label: 'Electronics', value: 'electronics'},
                {label: 'Clothing', value: 'clothing'},
                {label: 'Books', value: 'books'}
            ]"/>

        <template #end>
            <FluxPrimaryButton
                icon-leading="plus"
                label="Add item"/>
        </template>
    </FluxFilterBar>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilterBar, FluxFilterOption, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
    import type { FluxFilterState } from '@flux-ui/types';
    import { ref } from 'vue';

    const search = ref('');

    const filterState = ref<FluxFilterState>({
        status: null,
        category: null
    });
</script>
