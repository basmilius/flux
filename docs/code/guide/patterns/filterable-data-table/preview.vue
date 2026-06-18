<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="15">
            <FluxFilterBar
                v-model="filterState"
                v-model:search="search"
                is-searchable
                search-placeholder="Search projects...">
                <FluxFilterOption
                    icon="circle-check"
                    label="Status"
                    name="status"
                    :options="statusOptions"/>

                <FluxFilterRange
                    icon="coin"
                    label="Budget"
                    name="budget"
                    :formatter="budgetFormatter"
                    :max="100000"
                    :min="0"
                    :step="5000"/>
            </FluxFilterBar>

            <FluxPane>
                <FluxDataTable
                    :items="filtered"
                    :limits="[]"
                    :page="1"
                    :per-page="Math.max(filtered.length, 1)"
                    :total="filtered.length"
                    is-hoverable>
                    <template #header>
                        <FluxTableHeader>Project</FluxTableHeader>
                        <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                        <FluxTableHeader is-shrinking/>
                    </template>

                    <template #name="{item: {name, budget}}">
                        <FluxTableCell content-direction="column">
                            <strong>{{ name }}</strong>
                            <small>{{ budgetFormatter(budget) }}</small>
                        </FluxTableCell>
                    </template>

                    <template #status="{item: {status}}">
                        <FluxTableCell>
                            <FluxBadge
                                :color="STATUS[status].color"
                                :label="STATUS[status].label"/>
                        </FluxTableCell>
                    </template>

                    <template #actions="{}">
                        <FluxTableCell>
                            <FluxTableActions>
                                <FluxAction icon="pen"/>
                                <FluxAction icon="ellipsis-h"/>
                            </FluxTableActions>
                        </FluxTableCell>
                    </template>
                </FluxDataTable>
            </FluxPane>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxFilterState } from '@flux-ui/types';
    import { FluxAction, FluxBadge, FluxDataTable, FluxFilterBar, FluxFilterOption, FluxFilterRange, FluxFlex, FluxPane, FluxTableActions, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    type Status = 'active' | 'paused' | 'done';

    const STATUS: Record<Status, { color: FluxColor; label: string }> = {
        active: {color: 'success', label: 'Active'},
        paused: {color: 'warning', label: 'Paused'},
        done: {color: 'gray', label: 'Done'}
    };

    const statusOptions = [
        {label: 'Active', value: 'active'},
        {label: 'Paused', value: 'paused'},
        {label: 'Done', value: 'done'}
    ];

    const search = ref('');

    const filterState = ref<FluxFilterState>({
        status: null,
        budget: null
    });

    const projects: { id: number; name: string; status: Status; budget: number }[] = [
        {id: 1, name: 'Project Aurora', status: 'active', budget: 45000},
        {id: 2, name: 'Project Borealis', status: 'paused', budget: 12000},
        {id: 3, name: 'Project Cinder', status: 'active', budget: 78000},
        {id: 4, name: 'Project Delta', status: 'done', budget: 30000},
        {id: 5, name: 'Project Echo', status: 'active', budget: 9000}
    ];

    const filtered = computed(() => projects.filter(project => {
        const status = filterState.value.status;
        const budget = filterState.value.budget as [number, number] | null;

        if (search.value && !project.name.toLowerCase().includes(search.value.toLowerCase())) {
            return false;
        }

        if (status && project.status !== status) {
            return false;
        }

        if (budget && (project.budget < budget[0] || project.budget > budget[1])) {
            return false;
        }

        return true;
    }));

    function budgetFormatter(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            maximumFractionDigits: 0,
            style: 'currency'
        }).format(value);
    }
</script>
