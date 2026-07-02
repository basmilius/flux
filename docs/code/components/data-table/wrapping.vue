<template>
    <FluxPane>
        <FluxDataTable
            :items="tickets"
            :limits="[]"
            :page="1"
            :per-page="tickets.length"
            :total="tickets.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader :width="90">Ticket</FluxTableHeader>
                <FluxTableHeader :min-width="260">Subject</FluxTableHeader>
                <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                <FluxTableHeader is-shrinking>Updated</FluxTableHeader>
            </template>

            <template #reference="{item}">
                <FluxTableCell no-wrap>
                    <strong>{{ item.reference }}</strong>
                </FluxTableCell>
            </template>

            <template #subject="{item}">
                <FluxTableCell
                    content-direction="column"
                    :content-gap="3">
                    <strong>{{ item.subject }}</strong>
                    <small>{{ item.excerpt }}</small>
                </FluxTableCell>
            </template>

            <template #status="{item}">
                <FluxTableCell>
                    <FluxBadge
                        :color="statusColor[item.status]"
                        :label="item.status"/>
                </FluxTableCell>
            </template>

            <template #updated="{item}">
                <FluxTableCell no-wrap>{{ item.updated }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';

    type Status = 'Open' | 'Pending' | 'Resolved';

    type Ticket = {
        readonly id: number;
        readonly reference: string;
        readonly subject: string;
        readonly excerpt: string;
        readonly status: Status;
        readonly updated: string;
    };

    const statusColor: Record<Status, FluxColor> = {
        Open: 'primary',
        Pending: 'warning',
        Resolved: 'success'
    };

    const tickets: Ticket[] = [
        {id: 1, reference: 'SUP-482', subject: 'Column widths jump when the data table loads', excerpt: 'The layout briefly shows equal columns before the grid template resolves, which looks like a flash on slower connections.', status: 'Open', updated: 'Mar 2'},
        {id: 2, reference: 'SUP-479', subject: 'Sticky header overlaps the filter bar on Safari', excerpt: 'When scrolling quickly the header and the table bar overlap by a few pixels only in Safari 17.', status: 'Pending', updated: 'Mar 1'},
        {id: 3, reference: 'SUP-471', subject: 'Pinned column shadow missing in dark mode', excerpt: 'The edge shadow that indicates a pinned column is not visible against the dark surface token.', status: 'Resolved', updated: 'Feb 27'}
    ];
</script>
