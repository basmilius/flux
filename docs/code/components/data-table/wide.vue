<template>
    <FluxPane>
        <FluxDataTable
            :items="items"
            :limits="[]"
            :page="1"
            :per-page="items.length"
            :total="items.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader
                    pinned
                    :min-width="180">
                    Product
                </FluxTableHeader>

                <FluxTableHeader :min-width="150">SKU</FluxTableHeader>
                <FluxTableHeader :min-width="150">Category</FluxTableHeader>
                <FluxTableHeader :min-width="180">Supplier</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :min-width="120">
                    Stock
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :min-width="120">
                    Price
                </FluxTableHeader>
            </template>

            <template #name="{item}">
                <FluxTableCell pinned>
                    <strong>{{ item.name }}</strong>
                </FluxTableCell>
            </template>

            <template #sku="{item}">
                <FluxTableCell>{{ item.sku }}</FluxTableCell>
            </template>

            <template #category="{item}">
                <FluxTableCell>{{ item.category }}</FluxTableCell>
            </template>

            <template #supplier="{item}">
                <FluxTableCell>{{ item.supplier }}</FluxTableCell>
            </template>

            <template #stock="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.stock }}
                </FluxTableCell>
            </template>

            <template #price="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.price }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    const items = [
        {id: 1, name: 'Aurora Lamp', sku: 'AUR-001', category: 'Lighting', supplier: 'Lumen Co.', stock: 128, price: '€ 49.00'},
        {id: 2, name: 'Borealis Desk', sku: 'BOR-014', category: 'Furniture', supplier: 'Nordic Works', stock: 12, price: '€ 329.00'},
        {id: 3, name: 'Cinder Mug', sku: 'CIN-220', category: 'Kitchen', supplier: 'Clayworks', stock: 1043, price: '€ 14.50'},
        {id: 4, name: 'Delta Chair', sku: 'DEL-067', category: 'Furniture', supplier: 'Nordic Works', stock: 47, price: '€ 189.00'},
        {id: 5, name: 'Ember Kettle', sku: 'EMB-309', category: 'Kitchen', supplier: 'Clayworks', stock: 6, price: '€ 79.00'}
    ];
</script>
