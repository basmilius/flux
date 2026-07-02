<template>
    <FluxPane>
        <FluxDataTable
            :items="orders"
            :limits="[]"
            :page="1"
            :per-page="orders.length"
            :total="orders.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Order</FluxTableHeader>
                <FluxTableHeader :min-width="180">Customer</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-shrinking>
                    Items
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :min-width="120">
                    Total
                </FluxTableHeader>
            </template>

            <template #reference="{item}">
                <FluxTableCell>
                    <strong>{{ item.reference }}</strong>
                </FluxTableCell>
            </template>

            <template #customer="{item}">
                <FluxTableCell>{{ item.customer }}</FluxTableCell>
            </template>

            <template #items="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.items }}
                </FluxTableCell>
            </template>

            <template #total="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ formatCurrency(item.total) }}
                </FluxTableCell>
            </template>

            <template #footer>
                <FluxTableCell
                    align="end"
                    :colspan="3">
                    <strong>Page total</strong>
                </FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    <strong>{{ formatCurrency(pageTotal) }}</strong>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { computed } from 'vue';

    type Order = {
        readonly id: number;
        readonly reference: string;
        readonly customer: string;
        readonly items: number;
        readonly total: number;
    };

    const orders: Order[] = [
        {id: 1, reference: '#10241', customer: 'Lumen Co.', items: 4, total: 48000},
        {id: 2, reference: '#10242', customer: 'Nordic Works', items: 2, total: 32500},
        {id: 3, reference: '#10243', customer: 'Clayworks', items: 6, total: 61200},
        {id: 4, reference: '#10244', customer: 'Harbor Studio', items: 1, total: 18900}
    ];

    const pageTotal = computed(() => orders.reduce((sum, order) => sum + order.total, 0));

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(value);
    }
</script>
