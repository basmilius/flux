<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :width="96">Time</FluxTableHeader>
                <FluxTableHeader :min-width="220">Session</FluxTableHeader>
                <FluxTableHeader :min-width="160">Speaker</FluxTableHeader>
                <FluxTableHeader is-shrinking>Room</FluxTableHeader>
            </template>

            <template
                v-for="block in schedule"
                :key="block.label">
                <FluxTableRow>
                    <FluxTableCell :colspan="4">
                        <strong>{{ block.label }}</strong>
                    </FluxTableCell>
                </FluxTableRow>

                <FluxTableRow
                    v-for="session in block.sessions"
                    :key="session.title">
                    <FluxTableCell is-numeric>{{ session.time }}</FluxTableCell>
                    <FluxTableCell>{{ session.title }}</FluxTableCell>
                    <FluxTableCell>{{ session.speaker }}</FluxTableCell>
                    <FluxTableCell>{{ session.room }}</FluxTableCell>
                </FluxTableRow>
            </template>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    type Session = {
        readonly time: string;
        readonly title: string;
        readonly speaker: string;
        readonly room: string;
    };

    type Block = {
        readonly label: string;
        readonly sessions: Session[];
    };

    const schedule: Block[] = [
        {
            label: 'Morning track',
            sessions: [
                {time: '09:00', title: 'Designing for the grid', speaker: 'Mila Vega', room: 'Hall A'},
                {time: '10:15', title: 'Accessible tables in practice', speaker: 'Sven Halloran', room: 'Hall A'}
            ]
        },
        {
            label: 'Afternoon track',
            sessions: [
                {time: '13:30', title: 'Subgrid deep dive', speaker: 'Priya Nandal', room: 'Hall B'},
                {time: '15:00', title: 'From table to layout', speaker: 'Theo Marsh', room: 'Hall B'}
            ]
        }
    ];
</script>
