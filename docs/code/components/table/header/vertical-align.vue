<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader is-shrinking>Feature</FluxTableHeader>
                    <FluxTableHeader>Description</FluxTableHeader>
                    <FluxTableHeader
                        is-shrinking
                        vertical-align="center">
                        Since
                    </FluxTableHeader>
                    <FluxTableHeader
                        is-shrinking
                        align="end"
                        vertical-align="end">
                        Plan
                    </FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow
                v-for="feature of features"
                :key="feature.name">
                <FluxTableCell no-wrap>{{ feature.name }}</FluxTableCell>

                <FluxTableCell>{{ feature.description }}</FluxTableCell>

                <FluxTableCell no-wrap>{{ feature.since }}</FluxTableCell>

                <FluxTableCell no-wrap>{{ feature.plan }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    const features = [
        {
            name: 'Pinned columns',
            description: 'Keeps a column against the leading or trailing edge while the rest of the table scrolls horizontally. Several columns can be pinned to the same edge; they stack side by side.',
            since: '3.42.0',
            plan: 'Team'
        },
        {
            name: 'Column resizing',
            description: 'Gives a column an explicit width through its resize handle, by dragging it or with the keyboard. Double-clicking the handle returns the column to its automatic width.',
            since: '3.51.0',
            plan: 'Business'
        }
    ];
</script>
