<template>
    <FluxPane>
        <FluxDataTable
            :items="rows"
            :limits="[]"
            :page="1"
            :per-page="rows.length"
            :total="rows.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="160">Member</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :width="66">
                    Mon
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :width="66">
                    Tue
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :width="66">
                    Wed
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :width="66">
                    Thu
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :width="66">
                    Fri
                </FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    :width="78">
                    Total
                </FluxTableHeader>
            </template>

            <template #member="{item}">
                <FluxTableCell no-wrap>{{ item.member }}</FluxTableCell>
            </template>

            <template #mon="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.hours.mon }}
                </FluxTableCell>
            </template>

            <template #tue="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.hours.tue }}
                </FluxTableCell>
            </template>

            <template #wed="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.hours.wed }}
                </FluxTableCell>
            </template>

            <template #thu="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.hours.thu }}
                </FluxTableCell>
            </template>

            <template #fri="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    {{ item.hours.fri }}
                </FluxTableCell>
            </template>

            <template #total="{item}">
                <FluxTableCell
                    align="end"
                    is-numeric>
                    <strong>{{ weekTotal(item) }}</strong>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Hours = {
        readonly mon: number;
        readonly tue: number;
        readonly wed: number;
        readonly thu: number;
        readonly fri: number;
    };

    type Row = {
        readonly id: number;
        readonly member: string;
        readonly hours: Hours;
    };

    const rows: Row[] = [
        {id: 1, member: 'Ada Lovelace', hours: {mon: 8, tue: 8, wed: 7, thu: 8, fri: 6}},
        {id: 2, member: 'Alan Turing', hours: {mon: 7, tue: 8, wed: 8, thu: 8, fri: 8}},
        {id: 3, member: 'Grace Hopper', hours: {mon: 8, tue: 6, wed: 8, thu: 4, fri: 8}},
        {id: 4, member: 'Katherine Johnson', hours: {mon: 4, tue: 8, wed: 8, thu: 8, fri: 5}}
    ];

    function weekTotal(row: Row): number {
        return row.hours.mon + row.hours.tue + row.hours.wed + row.hours.thu + row.hours.fri;
    }
</script>
