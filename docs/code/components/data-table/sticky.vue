<template>
    <FluxPane>
        <FluxDataTable
            :items="events"
            :limits="[]"
            :page="1"
            :per-page="events.length"
            :total="events.length"
            is-hoverable
            is-sticky
            style="max-height: 360px">
            <template #filter>
                <FluxTableBar>
                    <FluxFlex
                        align="center"
                        justify="between">
                        <strong>Activity log</strong>
                        <FluxBadge :label="`${events.length} events`"/>
                    </FluxFlex>
                </FluxTableBar>
            </template>

            <template #header>
                <FluxTableHeader is-shrinking>Time</FluxTableHeader>
                <FluxTableHeader :min-width="180">Actor</FluxTableHeader>
                <FluxTableHeader :min-width="220">Event</FluxTableHeader>
            </template>

            <template #time="{item}">
                <FluxTableCell
                    is-numeric
                    no-wrap>
                    {{ item.time }}
                </FluxTableCell>
            </template>

            <template #actor="{item}">
                <FluxTableCell no-wrap>{{ item.actor }}</FluxTableCell>
            </template>

            <template #event="{item}">
                <FluxTableCell>{{ item.event }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxFlex, FluxPane, FluxTableBar, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Event = {
        readonly id: number;
        readonly time: string;
        readonly actor: string;
        readonly event: string;
    };

    const actors = ['Mila Vega', 'Sven Halloran', 'Priya Nandal', 'Theo Marsh', 'Lena Ortiz'];
    const actions = [
        'signed in',
        'updated the invoice #10241',
        'archived a product',
        'invited a team member',
        'exported the customer list',
        'changed the billing plan'
    ];

    const events: Event[] = Array.from({length: 40}, (_, index) => {
        const minutes = index * 7;
        const hours = 9 + Math.floor(minutes / 60);
        const mins = minutes % 60;

        return {
            id: index + 1,
            time: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
            actor: actors[index % actors.length],
            event: actions[index % actions.length]
        };
    });
</script>
