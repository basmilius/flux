<template>
    <FluxPane>
        <FluxDataTable
            v-model:selected="selected"
            :items="invoices"
            :limits="[]"
            :page="1"
            :per-page="6"
            selection-mode="multiple"
            :total="invoices.length"
            unique-key="id"
            is-hoverable>
            <template #selection="{count, clear, copy}">
                <FluxFlexItem :grow="1">
                    <FluxFlex
                        align="center"
                        :gap="9">
                        <span aria-live="polite">{{ count }} selected</span>

                        <FluxSpacer/>

                        <FluxSecondaryButton
                            icon-leading="copy"
                            label="Copy"
                            @click="copy()"/>

                        <FluxSecondaryButton
                            label="Clear"
                            @click="clear()"/>
                    </FluxFlex>
                </FluxFlexItem>
            </template>

            <template #header>
                <FluxTableHeader>Invoice</FluxTableHeader>
                <FluxTableHeader>Client</FluxTableHeader>
                <FluxTableHeader
                    align="end"
                    is-numeric>Amount
                </FluxTableHeader>
                <FluxTableHeader is-shrinking>Due</FluxTableHeader>
            </template>

            <template #number="{item}">
                <FluxTableCell>{{ item.number }}</FluxTableCell>
            </template>

            <template #client="{item}">
                <FluxTableCell>{{ item.client }}</FluxTableCell>
            </template>

            <template #amount="{item}">
                <FluxTableCell :copy-value="item.amount">{{ formatAmount(item.amount) }}</FluxTableCell>
            </template>

            <template #due="{item}">
                <FluxTableCell :copy-value="item.due">{{ formatDue(item.due) }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxFlex, FluxFlexItem, FluxPane, FluxSecondaryButton, FluxSpacer, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const selected = ref<number[]>([1, 3]);

    const invoices = ref([
        {id: 1, number: 'INV-1041', client: 'Northwind Trading', amount: 1284.5, due: '2026-08-14'},
        {id: 2, number: 'INV-1042', client: 'Contoso Industries', amount: 640, due: '2026-08-21'},
        {id: 3, number: 'INV-1043', client: 'Fabrikam Supplies', amount: 12750.75, due: '2026-09-01'},
        {id: 4, number: 'INV-1044', client: 'Adventure Works', amount: 320.25, due: '2026-09-08'},
        {id: 5, number: 'INV-1045', client: 'Litware Consulting', amount: 4980, due: '2026-09-15'},
        {id: 6, number: 'INV-1046', client: 'Proseware Media', amount: 87.9, due: '2026-09-22'}
    ]);

    function formatAmount(amount: number): string {
        return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    function formatDue(due: string): string {
        return DateTime.fromISO(due).toLocaleString(DateTime.DATE_MED);
    }
</script>
