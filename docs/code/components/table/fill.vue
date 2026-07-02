<template>
    <FluxPane>
        <FluxTable
            is-filled
            is-hoverable
            style="min-height: 360px">
            <template #header>
                <FluxTableHeader :width="96">Time</FluxTableHeader>
                <FluxTableHeader :min-width="180">Guest</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    is-shrinking>
                    Party
                </FluxTableHeader>

                <FluxTableHeader is-shrinking>Table</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="booking in bookings"
                :key="booking.id">
                <FluxTableCell is-numeric>{{ booking.time }}</FluxTableCell>
                <FluxTableCell>{{ booking.guest }}</FluxTableCell>

                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ booking.party }}
                </FluxTableCell>

                <FluxTableCell>{{ booking.table }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    type Booking = {
        readonly id: number;
        readonly time: string;
        readonly guest: string;
        readonly party: number;
        readonly table: string;
    };

    const bookings: Booking[] = [
        {id: 1, time: '18:30', guest: 'Vega party', party: 2, table: 'T4'},
        {id: 2, time: '19:00', guest: 'Halloran', party: 4, table: 'T9'},
        {id: 3, time: '20:15', guest: 'Nandal', party: 3, table: 'T2'}
    ];
</script>
