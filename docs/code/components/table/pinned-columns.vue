<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader
                    pinned
                    :min-width="180">
                    Project
                </FluxTableHeader>

                <FluxTableHeader
                    pinned
                    :min-width="150">
                    Owner
                </FluxTableHeader>

                <FluxTableHeader :min-width="150">Status</FluxTableHeader>
                <FluxTableHeader :min-width="150">Priority</FluxTableHeader>
                <FluxTableHeader :min-width="150">Start</FluxTableHeader>
                <FluxTableHeader :min-width="150">Due</FluxTableHeader>
                <FluxTableHeader :min-width="180">Client</FluxTableHeader>

                <FluxTableHeader
                    align="end"
                    pinned="end"
                    :min-width="140">
                    Budget
                </FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="project in projects"
                :key="project.id">
                <FluxTableCell pinned>
                    <strong>{{ project.name }}</strong>
                </FluxTableCell>

                <FluxTableCell pinned>{{ project.owner }}</FluxTableCell>
                <FluxTableCell>{{ project.status }}</FluxTableCell>
                <FluxTableCell>{{ project.priority }}</FluxTableCell>
                <FluxTableCell>{{ project.start }}</FluxTableCell>
                <FluxTableCell>{{ project.due }}</FluxTableCell>
                <FluxTableCell>{{ project.client }}</FluxTableCell>

                <FluxTableCell
                    align="end"
                    pinned="end"
                    is-numeric>
                    {{ project.budget }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script setup lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    const projects = [
        {id: 1, name: 'Aurora Redesign', owner: 'Mila Vega', status: 'In progress', priority: 'High', start: 'Jan 8', due: 'Mar 2', client: 'Lumen Co.', budget: '€ 48,000'},
        {id: 2, name: 'Borealis Mobile', owner: 'Sven Halloran', status: 'Planned', priority: 'Medium', start: 'Feb 1', due: 'Apr 18', client: 'Nordic Works', budget: '€ 32,500'},
        {id: 3, name: 'Cinder Analytics', owner: 'Priya Nandal', status: 'In progress', priority: 'High', start: 'Jan 22', due: 'May 6', client: 'Clayworks', budget: '€ 61,200'},
        {id: 4, name: 'Delta Onboarding', owner: 'Theo Marsh', status: 'Review', priority: 'Low', start: 'Dec 12', due: 'Feb 9', client: 'Nordic Works', budget: '€ 18,900'},
        {id: 5, name: 'Ember Storefront', owner: 'Lena Ortiz', status: 'In progress', priority: 'Medium', start: 'Feb 14', due: 'Jun 1', client: 'Clayworks', budget: '€ 54,750'}
    ];
</script>
