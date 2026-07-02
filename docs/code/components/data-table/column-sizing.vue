<template>
    <FluxPane>
        <FluxDataTable
            :items="products"
            :limits="[]"
            :page="1"
            :per-page="products.length"
            :total="products.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader :width="120">SKU</FluxTableHeader>
                <FluxTableHeader>Product</FluxTableHeader>

                <FluxTableHeader
                    :min-width="120"
                    :max-width="220">
                    Category
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-shrinking>
                    Price
                </FluxTableHeader>

                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
            </template>

            <template #sku="{item}">
                <FluxTableCell>{{ item.sku }}</FluxTableCell>
            </template>

            <template #name="{item}">
                <FluxTableCell>
                    <strong>{{ item.name }}</strong>
                </FluxTableCell>
            </template>

            <template #category="{item}">
                <FluxTableCell>{{ item.category }}</FluxTableCell>
            </template>

            <template #price="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ formatCurrency(item.price) }}
                </FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <FluxBadge
                        :color="item.stock > 0 ? 'success' : 'gray'"
                        :label="item.stock > 0 ? 'In stock' : 'Sold out'"/>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Product = {
        readonly id: number;
        readonly sku: string;
        readonly name: string;
        readonly category: string;
        readonly price: number;
        readonly stock: number;
    };

    const products: Product[] = [
        {id: 1, sku: 'AC-1024', name: 'Aurora Ceiling Light', category: 'Lighting', price: 4900, stock: 34},
        {id: 2, sku: 'FD-2087', name: 'Borealis Standing Desk', category: 'Furniture', price: 32900, stock: 8},
        {id: 3, sku: 'KD-3391', name: 'Cinder Ceramic Mug', category: 'Kitchen & dining', price: 1450, stock: 0},
        {id: 4, sku: 'FD-4410', name: 'Delta Lounge Chair', category: 'Furniture', price: 18900, stock: 15},
        {id: 5, sku: 'KD-5502', name: 'Ember Electric Kettle', category: 'Kitchen & dining', price: 7900, stock: 21}
    ];

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(value / 100);
    }
</script>
