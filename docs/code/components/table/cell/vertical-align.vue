<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader is-shrinking>Version</FluxTableHeader>
                    <FluxTableHeader>Notes</FluxTableHeader>
                    <FluxTableHeader
                        is-shrinking
                        vertical-align="center">
                        Status
                    </FluxTableHeader>
                    <FluxTableHeader is-shrinking>Author</FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow
                v-for="release of releases"
                :key="release.version">
                <FluxTableCell no-wrap>{{ release.version }}</FluxTableCell>

                <FluxTableCell>{{ release.notes }}</FluxTableCell>

                <FluxTableCell no-wrap>{{ release.status }}</FluxTableCell>

                <FluxTableCell
                    no-wrap
                    vertical-align="end">
                    {{ release.author }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    const releases = [
        {
            version: '3.59.0',
            notes: 'The sliders picked up the fader\'s elastic overdrag, and the statistics pane stopped sizing an empty state by aspect ratio.',
            status: 'Released',
            author: 'Bas'
        },
        {
            version: '3.58.2',
            notes: 'Table cells resolve their column through the header again after a rowspan, and the pinned edge no longer flickers while scrolling.',
            status: 'Released',
            author: 'Bas'
        }
    ];
</script>
