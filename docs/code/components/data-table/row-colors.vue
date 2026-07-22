<template>
    <FluxPane>
        <FluxDataTable
            :items="dataSet"
            :limits="[]"
            :page="1"
            :per-page="5"
            :row-color="getRowColor"
            :total="dataSet.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>
                    Invoice
                </FluxTableHeader>

                <FluxTableHeader>
                    Customer
                </FluxTableHeader>

                <FluxTableHeader>
                    Status
                </FluxTableHeader>
            </template>

            <template #number="{item: {number}}">
                <FluxTableCell>
                    {{ number }}
                </FluxTableCell>
            </template>

            <template #customer="{item: {customer}}">
                <FluxTableCell>
                    {{ customer }}
                </FluxTableCell>
            </template>

            <template #status="{item: {status}}">
                <FluxTableCell>
                    {{ status }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Invoice = {
        readonly id: number;
        readonly number: string;
        readonly customer: string;
        readonly status: 'Paid' | 'Open' | 'Expiring soon' | 'Overdue';
    };

    const dataSet: Invoice[] = [
        {id: 1, number: 'INV-2031', customer: 'Alice Johnson', status: 'Paid'},
        {id: 2, number: 'INV-2032', customer: 'Bas Milius', status: 'Open'},
        {id: 3, number: 'INV-2033', customer: 'Carol White', status: 'Expiring soon'},
        {id: 4, number: 'INV-2034', customer: 'Daniel Brown', status: 'Overdue'},
        {id: 5, number: 'INV-2035', customer: 'Emma Davis', status: 'Paid'}
    ];

    function getRowColor(item: Invoice): FluxColor | undefined {
        switch (item.status) {
            case 'Expiring soon':
                return 'warning';

            case 'Overdue':
                return 'danger';

            default:
                return undefined;
        }
    }
</script>
