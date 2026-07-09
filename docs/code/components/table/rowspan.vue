<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader is-shrinking>Track</FluxTableHeader>
                <FluxTableHeader :width="96">Time</FluxTableHeader>
                <FluxTableHeader :min-width="220">Session</FluxTableHeader>
                <FluxTableHeader :min-width="160">Speaker</FluxTableHeader>
            </template>

            <template
                v-for="track in schedule"
                :key="track.name">
                <FluxTableRow
                    v-for="(session, index) in track.sessions"
                    :key="session.title">
                    <FluxTableCell
                        v-if="index === 0"
                        :rowspan="track.sessions.length">
                        <strong>{{ track.name }}</strong>
                    </FluxTableCell>

                    <FluxTableCell is-numeric>{{ session.time }}</FluxTableCell>
                    <FluxTableCell>{{ session.title }}</FluxTableCell>
                    <FluxTableCell>{{ session.speaker }}</FluxTableCell>
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
    };

    type Track = {
        readonly name: string;
        readonly sessions: Session[];
    };

    const schedule: Track[] = [
        {
            name: 'Hall A',
            sessions: [
                {time: '09:00', title: 'Designing for the grid', speaker: 'Mila Vega'},
                {time: '10:15', title: 'Accessible tables in practice', speaker: 'Sven Halloran'},
                {time: '11:30', title: 'Layout without tables', speaker: 'Ada Fenwick'}
            ]
        },
        {
            name: 'Hall B',
            sessions: [
                {time: '13:30', title: 'Subgrid deep dive', speaker: 'Priya Nandal'},
                {time: '15:00', title: 'From table to layout', speaker: 'Theo Marsh'}
            ]
        }
    ];
</script>
