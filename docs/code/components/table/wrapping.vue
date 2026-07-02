<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader :width="96">Version</FluxTableHeader>
                <FluxTableHeader is-shrinking>Date</FluxTableHeader>
                <FluxTableHeader :min-width="280">Change</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="entry in changelog"
                :key="entry.version">
                <FluxTableCell no-wrap>
                    <strong>{{ entry.version }}</strong>
                </FluxTableCell>

                <FluxTableCell no-wrap>{{ entry.date }}</FluxTableCell>
                <FluxTableCell>{{ entry.change }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    type ChangelogEntry = {
        readonly version: string;
        readonly date: string;
        readonly change: string;
    };

    const changelog: ChangelogEntry[] = [
        {version: '2.4.0', date: 'Mar 2', change: 'Migrated the table components to CSS Grid so rows share a single track template and columns can be pinned, sized and spanned without wrapper elements.'},
        {version: '2.3.1', date: 'Feb 18', change: 'Fixed sticky header alignment when a table bar is present and corrected the focus ring on sortable column headers.'},
        {version: '2.3.0', date: 'Feb 4', change: 'Added per-column sizing props (width, min-width and max-width) and a shrinking mode for columns that should hug their content.'},
        {version: '2.2.0', date: 'Jan 20', change: 'Introduced collapsible table groups with an optional trailing badge slot for counts and other metadata.'}
    ];
</script>
