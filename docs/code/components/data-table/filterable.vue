<template>
    <FluxPane>
        <FluxDataTable
            v-model:selected="selected"
            :items="paginatedItems"
            :limits="[5, 10, 25]"
            :page="page"
            :per-page="perPage"
            :total="filteredItems.length"
            selection-mode="multiple"
            unique-key="id"
            is-hoverable
            @limit="onLimit"
            @navigate="page = $event">
            <template #filter>
                <FluxTableBar>
                    <FluxFilterBar
                        v-model="filterState"
                        v-model:search="search"
                        is-searchable
                        search-placeholder="Search products...">
                        <FluxFilterOption
                            icon="circle-check"
                            label="Status"
                            name="status"
                            :options="statusOptions"/>

                        <FluxFilterOption
                            icon="clone"
                            label="Category"
                            name="category"
                            :options="categoryOptions"/>
                    </FluxFilterBar>
                </FluxTableBar>
            </template>

            <template #header>
                <FluxTableHeader>Product</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                <FluxTableHeader
                    align="end"
                    is-shrinking>
                    Price
                </FluxTableHeader>
            </template>

            <template #name="{item}">
                <FluxTableCell content-direction="column">
                    <strong>{{ item.name }}</strong>
                    <small>{{ categoryLabels[item.category] }}</small>
                </FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <FluxBadgeStack>
                        <FluxBadge
                            :color="item.status === 'active' ? 'success' : 'gray'"
                            :label="item.status === 'active' ? 'Active' : 'Archived'"/>
                    </FluxBadgeStack>
                </FluxTableCell>
            </template>

            <template #price="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric
                    no-wrap>
                    {{ priceLabel(item.price) }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBadgeStack, FluxDataTable, FluxFilterBar, FluxFilterOption, FluxPane, FluxTableBar, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import type { FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import { computed, ref, watch } from 'vue';

    type Category = 'lighting' | 'furniture' | 'kitchen';

    type Product = {
        readonly id: number;
        readonly name: string;
        readonly category: Category;
        readonly status: 'active' | 'archived';
        readonly price: number;
    };

    const categoryLabels: Record<Category, string> = {
        lighting: 'Lighting',
        furniture: 'Furniture',
        kitchen: 'Kitchen'
    };

    const statusOptions: FluxFilterOptionItem[] = [
        {icon: 'circle-check', label: 'Active', value: 'active'},
        {icon: 'circle-xmark', label: 'Archived', value: 'archived'}
    ];

    const categoryOptions: FluxFilterOptionItem[] = [
        {label: 'Lighting', value: 'lighting'},
        {label: 'Furniture', value: 'furniture'},
        {label: 'Kitchen', value: 'kitchen'}
    ];

    const products: Product[] = [
        {id: 1, name: 'Aurora Lamp', category: 'lighting', status: 'active', price: 4900},
        {id: 2, name: 'Borealis Desk', category: 'furniture', status: 'active', price: 32900},
        {id: 3, name: 'Cinder Mug', category: 'kitchen', status: 'archived', price: 1450},
        {id: 4, name: 'Delta Chair', category: 'furniture', status: 'active', price: 18900},
        {id: 5, name: 'Ember Kettle', category: 'kitchen', status: 'active', price: 7900},
        {id: 6, name: 'Flare Sconce', category: 'lighting', status: 'archived', price: 6900},
        {id: 7, name: 'Glow Pendant', category: 'lighting', status: 'active', price: 12900},
        {id: 8, name: 'Harbor Stool', category: 'furniture', status: 'active', price: 9900},
        {id: 9, name: 'Iris Teapot', category: 'kitchen', status: 'active', price: 5400},
        {id: 10, name: 'Juno Floor Lamp', category: 'lighting', status: 'active', price: 21900},
        {id: 11, name: 'Koto Bench', category: 'furniture', status: 'archived', price: 27900},
        {id: 12, name: 'Lumen Toaster', category: 'kitchen', status: 'active', price: 8400}
    ];

    const page = ref(1);
    const perPage = ref(5);
    const search = ref('');
    const selected = ref<number[]>([]);

    const filterState = ref<FluxFilterState>({
        status: null,
        category: null
    });

    const filteredItems = computed(() => products.filter(product => {
        if (search.value && !product.name.toLowerCase().includes(search.value.toLowerCase())) {
            return false;
        }

        if (filterState.value.status && product.status !== filterState.value.status) {
            return false;
        }

        if (filterState.value.category && product.category !== filterState.value.category) {
            return false;
        }

        return true;
    }));

    const paginatedItems = computed(() => {
        const start = (page.value - 1) * perPage.value;

        return filteredItems.value.slice(start, start + perPage.value);
    });

    watch([search, filterState], () => {
        page.value = 1;
    }, {deep: true});

    function onLimit(limit: number): void {
        perPage.value = limit;
        page.value = 1;
    }

    function priceLabel(price: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(price / 100);
    }
</script>
