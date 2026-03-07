<template>
    <Preview>
        <FluxFilterBar
            v-model="filterState"
            v-model:search="search"
            is-searchable
            search-placeholder="Search items..."
            :resettable="['status', 'category']">
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

            <FluxFilterRange
                icon="coin"
                label="Price"
                name="price"
                :formatter="priceFormatter"
                :max="1000"
                :min="0"
                :step="10"/>
        </FluxFilterBar>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilterBar, FluxFilterOption, FluxFilterRange } from '@flux-ui/components';
    import type { FluxFilterState } from '@flux-ui/types';
    import { inBrowser } from 'vitepress';
    import { ref } from 'vue';

    const search = ref('');

    const filterState = ref<FluxFilterState>({
        status: null,
        category: null,
        price: null
    });

    function priceFormatter(value: number): string {
        return new Intl.NumberFormat(inBrowser ? navigator.language : 'en', {
            currency: 'EUR',
            maximumFractionDigits: 0,
            style: 'currency'
        }).format(value / 100);
    }
</script>
