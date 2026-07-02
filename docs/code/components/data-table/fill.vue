<template>
    <FluxPane>
        <FluxDataTable
            :items="visibleItems"
            :limits="[6, 12]"
            :page="page"
            :per-page="perPage"
            :total="inventory.length"
            is-filled
            is-hoverable
            style="min-height: 420px"
            @limit="onLimit"
            @navigate="page = $event">
            <template #header>
                <FluxTableHeader :width="90">SKU</FluxTableHeader>
                <FluxTableHeader>Item</FluxTableHeader>
                <FluxTableHeader is-shrinking>Location</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-shrinking>
                    Quantity
                </FluxTableHeader>
            </template>

            <template #sku="{item}">
                <FluxTableCell no-wrap>{{ item.sku }}</FluxTableCell>
            </template>

            <template #name="{item}">
                <FluxTableCell>{{ item.name }}</FluxTableCell>
            </template>

            <template #location="{item}">
                <FluxTableCell no-wrap>{{ item.location }}</FluxTableCell>
            </template>

            <template #quantity="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.quantity }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    type InventoryItem = {
        readonly id: number;
        readonly sku: string;
        readonly name: string;
        readonly location: string;
        readonly quantity: number;
    };

    const inventory: InventoryItem[] = [
        {id: 1, sku: 'A-01', name: 'Aurora Ceiling Light', location: 'Aisle 1 · Bay A', quantity: 34},
        {id: 2, sku: 'A-02', name: 'Borealis Standing Desk', location: 'Aisle 1 · Bay C', quantity: 8},
        {id: 3, sku: 'A-03', name: 'Cinder Ceramic Mug', location: 'Aisle 2 · Bay A', quantity: 120},
        {id: 4, sku: 'A-04', name: 'Delta Lounge Chair', location: 'Aisle 2 · Bay D', quantity: 15},
        {id: 5, sku: 'A-05', name: 'Ember Electric Kettle', location: 'Aisle 3 · Bay B', quantity: 21},
        {id: 6, sku: 'A-06', name: 'Flare Wall Sconce', location: 'Aisle 3 · Bay E', quantity: 47},
        {id: 7, sku: 'A-07', name: 'Glow Pendant Lamp', location: 'Aisle 4 · Bay A', quantity: 12},
        {id: 8, sku: 'A-08', name: 'Harbor Bar Stool', location: 'Aisle 4 · Bay C', quantity: 3}
    ];

    const page = ref(1);
    const perPage = ref(6);

    const visibleItems = computed(() => inventory.slice((page.value - 1) * perPage.value, page.value * perPage.value));

    function onLimit(limit: number): void {
        perPage.value = limit;
        page.value = 1;
    }
</script>
