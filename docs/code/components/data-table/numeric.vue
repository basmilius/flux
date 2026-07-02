<template>
    <FluxPane>
        <FluxDataTable
            :items="sortedItems"
            :limits="[]"
            :page="1"
            :per-page="transactions.length"
            :total="transactions.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader
                    data-type="date"
                    is-shrinking
                    is-sortable
                    :sort="sortColumn === 'date' ? sortDirection : undefined"
                    @sort="setSort('date', $event)">
                    Date
                </FluxTableHeader>

                <FluxTableHeader :min-width="200">Description</FluxTableHeader>
                <FluxTableHeader is-shrinking>Category</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    data-type="numeric"
                    is-sortable
                    :sort="sortColumn === 'amount' ? sortDirection : undefined"
                    @sort="setSort('amount', $event)">
                    Amount
                </FluxTableHeader>
            </template>

            <template #date="{item}">
                <FluxTableCell
                    is-numeric
                    no-wrap>
                    {{ item.date }}
                </FluxTableCell>
            </template>

            <template #description="{item}">
                <FluxTableCell>{{ item.description }}</FluxTableCell>
            </template>

            <template #category="{item}">
                <FluxTableCell>
                    <FluxBadge
                        color="gray"
                        :label="item.category"/>
                </FluxTableCell>
            </template>

            <template #amount="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric
                    no-wrap>
                    {{ formatCurrency(item.amount) }}
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    type SortDirection = 'ascending' | 'descending';
    type SortColumn = 'date' | 'amount';

    type Transaction = {
        readonly id: number;
        readonly date: string;
        readonly order: number;
        readonly description: string;
        readonly category: string;
        readonly amount: number;
    };

    const transactions: Transaction[] = [
        {id: 1, date: 'Feb 2', order: 20260202, description: 'Invoice #10241 — Lumen Co.', category: 'Income', amount: 4800},
        {id: 2, date: 'Feb 5', order: 20260205, description: 'Cloud hosting', category: 'Expense', amount: -320},
        {id: 3, date: 'Feb 11', order: 20260211, description: 'Invoice #10243 — Clayworks', category: 'Income', amount: 6120},
        {id: 4, date: 'Feb 14', order: 20260214, description: 'Design software licences', category: 'Expense', amount: -540},
        {id: 5, date: 'Feb 22', order: 20260222, description: 'Refund — Harbor Studio', category: 'Refund', amount: -189}
    ];

    const sortColumn = ref<SortColumn | null>('date');
    const sortDirection = ref<SortDirection>('descending');

    const sortedItems = computed(() => {
        const column = sortColumn.value;

        if (!column) {
            return transactions;
        }

        const factor = sortDirection.value === 'ascending' ? 1 : -1;
        const key = column === 'date' ? 'order' : 'amount';

        return [...transactions].sort((a, b) => (a[key] - b[key]) * factor);
    });

    function setSort(column: SortColumn, direction: SortDirection | null): void {
        if (direction === null) {
            sortColumn.value = null;
            return;
        }

        sortColumn.value = column;
        sortDirection.value = direction;
    }

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            signDisplay: 'always',
            style: 'currency'
        }).format(value);
    }
</script>
