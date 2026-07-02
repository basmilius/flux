<template>
    <FluxPane>
        <FluxTable is-hoverable>
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
                    Stock
                </FluxTableHeader>

                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="product in products"
                :key="product.sku">
                <FluxTableCell>{{ product.sku }}</FluxTableCell>

                <FluxTableCell>
                    <strong>{{ product.name }}</strong>
                </FluxTableCell>

                <FluxTableCell>{{ product.category }}</FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ product.stock }}
                </FluxTableCell>

                <FluxTableCell>
                    <FluxBadge
                        :color="product.stock > 0 ? 'success' : 'danger'"
                        :label="product.stock > 0 ? 'In stock' : 'Sold out'"/>
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    type Product = {
        readonly sku: string;
        readonly name: string;
        readonly category: string;
        readonly stock: number;
    };

    const products: Product[] = [
        {sku: 'AC-1024', name: 'Aurora Ceiling Light', category: 'Lighting', stock: 34},
        {sku: 'FD-2087', name: 'Borealis Standing Desk', category: 'Furniture', stock: 8},
        {sku: 'KD-3391', name: 'Cinder Ceramic Mug', category: 'Kitchen & dining', stock: 0},
        {sku: 'FD-4410', name: 'Delta Lounge Chair', category: 'Furniture', stock: 15},
        {sku: 'KD-5502', name: 'Ember Electric Kettle', category: 'Kitchen & dining', stock: 21}
    ];
</script>
