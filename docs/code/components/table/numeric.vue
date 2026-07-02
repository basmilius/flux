<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="200">Endpoint</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    data-type="numeric"
                    is-sortable
                    :sort="sortColumn === 'requests' ? sortDirection : undefined"
                    @sort="setSort('requests', $event)">
                    Requests
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    data-type="numeric"
                    is-sortable
                    :sort="sortColumn === 'latency' ? sortDirection : undefined"
                    @sort="setSort('latency', $event)">
                    Avg latency
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    data-type="numeric"
                    is-sortable
                    :sort="sortColumn === 'errorRate' ? sortDirection : undefined"
                    @sort="setSort('errorRate', $event)">
                    Error rate
                </FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="row in sortedRows"
                :key="row.endpoint">
                <FluxTableCell>{{ row.endpoint }}</FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ row.requests.toLocaleString('en') }}
                </FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ row.latency }} ms
                </FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ row.errorRate.toFixed(2) }}%
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    type SortDirection = 'ascending' | 'descending';
    type SortColumn = 'requests' | 'latency' | 'errorRate';

    type Metric = {
        readonly endpoint: string;
        readonly requests: number;
        readonly latency: number;
        readonly errorRate: number;
    };

    const rows: Metric[] = [
        {endpoint: 'GET /api/orders', requests: 128420, latency: 84, errorRate: 0.12},
        {endpoint: 'POST /api/orders', requests: 24180, latency: 213, errorRate: 1.34},
        {endpoint: 'GET /api/products', requests: 302914, latency: 47, errorRate: 0.05},
        {endpoint: 'GET /api/customers', requests: 58210, latency: 132, errorRate: 0.42},
        {endpoint: 'DELETE /api/sessions', requests: 9120, latency: 76, errorRate: 2.18}
    ];

    const sortColumn = ref<SortColumn | null>('requests');
    const sortDirection = ref<SortDirection>('descending');

    const sortedRows = computed(() => {
        const column = sortColumn.value;

        if (!column) {
            return rows;
        }

        const factor = sortDirection.value === 'ascending' ? 1 : -1;

        return [...rows].sort((a, b) => (a[column] - b[column]) * factor);
    });

    function setSort(column: SortColumn, direction: SortDirection | null): void {
        if (direction === null) {
            sortColumn.value = null;
            return;
        }

        sortColumn.value = column;
        sortDirection.value = direction;
    }
</script>
