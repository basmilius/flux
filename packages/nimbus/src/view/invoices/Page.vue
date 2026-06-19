<template>
    <FluxApplicationContent layout="full">
        <FluxDataTable
            is-hoverable
            is-sticky
            :fill-columns="6"
            :items="visibleItems"
            :limits="[10, 25, 50]"
            :page="page"
            :per-page="perPage"
            :total="filteredItems.length"
            @limit="value => perPage = value"
            @navigate="value => page = value">
            <template #filter>
                <FluxTableBar>
                    <FluxFilterBar
                        v-model="filterState"
                        v-model:search="search"
                        is-searchable
                        search-placeholder="Search by number or client...">
                        <FluxFilterOptions
                            icon="circle-check"
                            label="Status"
                            name="status"
                            :options="statusOptions"/>
                        <FluxFilterDateRange
                            icon="calendar"
                            label="Issued"
                            name="issued"/>
                        <FluxFilterRange
                            :formatter="formatCurrency"
                            icon="sack-dollar"
                            label="Amount"
                            :max="maxAmount"
                            :min="0"
                            name="amount"/>
                    </FluxFilterBar>
                </FluxTableBar>
            </template>

            <template #header>
                <FluxTableHeader>Invoice</FluxTableHeader>
                <FluxTableHeader>Client</FluxTableHeader>
                <FluxTableHeader is-shrinking>Issued</FluxTableHeader>
                <FluxTableHeader is-shrinking>Amount</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                <FluxTableHeader is-shrinking/>
            </template>

            <template #invoice="{item}">
                <FluxTableCell>
                    <RouterLink
                        class="invoice-number"
                        :to="{name: 'invoice', params: {id: item.id}}">
                        <FluxBoxedIcon
                            :color="INVOICE_STATUS[item.status].color"
                            name="receipt"/>
                        <strong>{{ item.number }}</strong>
                    </RouterLink>
                </FluxTableCell>
            </template>

            <template #client="{item}">
                <FluxTableCell>{{ clientName(item.clientId) }}</FluxTableCell>
            </template>

            <template #issued="{item}">
                <FluxTableCell content-direction="column">
                    <span>{{ item.issueDate.toFormat('LLL d, yyyy') }}</span>
                    <small>Due {{ item.dueDate.toFormat('LLL d') }}</small>
                </FluxTableCell>
            </template>

            <template #amount="{item}">
                <FluxTableCell>
                    <span class="amount">{{ formatCurrency(invoiceTotal(item)) }}</span>
                </FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <StatusBadge :meta="INVOICE_STATUS[item.status]"/>
                </FluxTableCell>
            </template>

            <template #actions="{item}">
                <FluxTableCell>
                    <FluxTableActions>
                        <FluxTooltip
                            v-if="item.status !== 'paid'"
                            content="Mark as paid">
                            <FluxAction
                                icon="circle-check"
                                @click="markPaid(item.id, item.number)"/>
                        </FluxTooltip>
                        <FluxTooltip content="Open invoice">
                            <FluxAction
                                icon="arrow-right"
                                type="route"
                                :to="{name: 'invoice', params: {id: item.id}}"/>
                        </FluxTooltip>
                    </FluxTableActions>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxAction, FluxBoxedIcon, FluxDataTable, FluxFilterBar, FluxFilterDateRange, FluxFilterOptions, FluxFilterRange, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTooltip, showSnackbar } from '@flux-ui/components';
    import type { FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import type { DateTime } from 'luxon';
    import { computed, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { defineTitle } from '@/composable';
    import { invoiceTotal, useClientsStore, useInvoicesStore } from '@/store';
    import type { Id } from '@/types';
    import { formatCurrency, INVOICE_STATUS } from '@/util';

    defineTitle('file-invoice-dollar', 'Invoices');

    const {invoices, markAsPaid} = useInvoicesStore();
    const {getClient} = useClientsStore();

    const search = ref('');
    const filterState = ref<FluxFilterState>({status: [], issued: null, amount: null});
    const page = ref(1);
    const perPage = ref(10);

    const statusOptions: FluxFilterOptionItem[] = [
        {label: 'Draft', value: 'draft'},
        {label: 'Sent', value: 'sent'},
        {label: 'Paid', value: 'paid'},
        {label: 'Overdue', value: 'overdue'}
    ];

    const maxAmount = computed(() => Math.max(5000, ...invoices.value.map(invoice => invoiceTotal(invoice))));

    function clientName(clientId: Id): string {
        return getClient(clientId)?.name ?? 'Unknown client';
    }

    const filteredItems = computed(() => invoices.value.filter(invoice => {
        const status = filterState.value.status;
        const matchesStatus = !Array.isArray(status) || status.length === 0 || status.includes(invoice.status);

        const issued = filterState.value.issued;
        const matchesIssued = !Array.isArray(issued) || (invoice.issueDate >= (issued[0] as DateTime) && invoice.issueDate <= (issued[1] as DateTime));

        const amount = filterState.value.amount;
        const total = invoiceTotal(invoice);
        const matchesAmount = !Array.isArray(amount)
            || ((amount[0] == null || total >= Number(amount[0])) && (amount[1] == null || total <= Number(amount[1])));

        const haystack = `${invoice.number} ${clientName(invoice.clientId)}`.toLowerCase();
        const matchesSearch = search.value === '' || haystack.includes(search.value.toLowerCase());

        return matchesStatus && matchesIssued && matchesAmount && matchesSearch;
    }));

    const visibleItems = computed(() => filteredItems.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));

    async function markPaid(id: Id, number: string): Promise<void> {
        markAsPaid(id);
        await showSnackbar({color: 'success', icon: 'circle-check', message: `${number} marked as paid.`});
    }
</script>

<style scoped>
    .invoice-number {
        display: flex;
        align-items: center;
        gap: 12px;
        color: inherit;
        text-decoration: none;
    }

    .amount {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
    }
</style>
