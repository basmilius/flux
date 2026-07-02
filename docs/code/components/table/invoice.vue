<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader :min-width="240">Description</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-shrinking>
                    Qty
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :min-width="120">
                    Unit price
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :min-width="120">
                    Amount
                </FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="line in lines"
                :key="line.id">
                <FluxTableCell>{{ line.description }}</FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ line.quantity }}
                </FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ formatCurrency(line.unitPrice) }}
                </FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ formatCurrency(line.quantity * line.unitPrice) }}
                </FluxTableCell>
            </FluxTableRow>

            <template #footer>
                <FluxTableRow>
                    <FluxTableCell
                        align="end"
                        :colspan="3">
                        Subtotal
                    </FluxTableCell>

                    <FluxTableCell
                        align="end"
                        is-numeric>
                        {{ formatCurrency(subtotal) }}
                    </FluxTableCell>
                </FluxTableRow>

                <FluxTableRow>
                    <FluxTableCell
                        align="end"
                        :colspan="3">
                        VAT 21%
                    </FluxTableCell>

                    <FluxTableCell
                        align="end"
                        is-numeric>
                        {{ formatCurrency(vat) }}
                    </FluxTableCell>
                </FluxTableRow>

                <FluxTableRow>
                    <FluxTableCell
                        align="end"
                        :colspan="3">
                        <strong>Total</strong>
                    </FluxTableCell>

                    <FluxTableCell
                        align="end"
                        is-numeric>
                        <strong>{{ formatCurrency(total) }}</strong>
                    </FluxTableCell>
                </FluxTableRow>
            </template>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { computed } from 'vue';

    type InvoiceLine = {
        readonly id: number;
        readonly description: string;
        readonly quantity: number;
        readonly unitPrice: number;
    };

    const lines: InvoiceLine[] = [
        {id: 1, description: 'UX audit and research', quantity: 12, unitPrice: 95},
        {id: 2, description: 'Design system components', quantity: 24, unitPrice: 110},
        {id: 3, description: 'Prototype and handoff', quantity: 8, unitPrice: 120},
        {id: 4, description: 'Accessibility review', quantity: 6, unitPrice: 85}
    ];

    const subtotal = computed(() => lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0));
    const vat = computed(() => subtotal.value * 0.21);
    const total = computed(() => subtotal.value + vat.value);

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(value);
    }
</script>
