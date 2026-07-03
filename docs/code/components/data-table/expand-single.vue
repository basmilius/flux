<template>
    <FluxPane>
        <FluxDataTable
            v-model:expanded="expanded"
            expand-mode="single"
            :items="dataSet"
            :limits="[]"
            :page="1"
            :per-page="5"
            :total="dataSet.length"
            unique-key="id"
            is-hoverable>
            <template #header>
                <FluxTableHeader>
                    Order
                </FluxTableHeader>

                <FluxTableHeader is-shrinking>
                    Total
                </FluxTableHeader>
            </template>

            <template #reference="{item}">
                <FluxTableCell content-direction="column">
                    <strong>{{ item.reference }}</strong>
                    <small>{{ item.customer }}</small>
                </FluxTableCell>
            </template>

            <template #total="{item}">
                <FluxTableCell
                    is-numeric
                    no-wrap>
                    {{ item.total }}
                </FluxTableCell>
            </template>

            <template #expandable="{item}">
                <FluxDescriptionList>
                    <FluxDescriptionItem label="Customer">
                        {{ item.customer }}
                    </FluxDescriptionItem>

                    <FluxDescriptionItem label="Items">
                        {{ item.items }}
                    </FluxDescriptionItem>

                    <FluxDescriptionItem label="Shipping">
                        {{ item.shipping }}
                    </FluxDescriptionItem>
                </FluxDescriptionList>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxDescriptionItem, FluxDescriptionList, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { ref } from 'vue';

    const expanded = ref<number[]>([1]);

    const dataSet = [
        {id: 1, reference: '#2024-0001', customer: 'Acme Inc.', total: '€ 1,240.00', items: 3, shipping: 'Standard'},
        {id: 2, reference: '#2024-0002', customer: 'Globex', total: '€ 320.00', items: 1, shipping: 'Express'},
        {id: 3, reference: '#2024-0003', customer: 'Initech', total: '€ 78.50', items: 2, shipping: 'Standard'}
    ];
</script>
