<template>
    <Preview>
        <FluxKanban style="max-width: 100%">
            <FluxKanbanSwimlane
                v-for="lane in lanes"
                :key="lane.id"
                :swimlane-id="lane.id"
                :color="lane.color"
                :label="lane.label">
                <FluxKanbanColumn
                    v-for="column in columns"
                    :key="column.id"
                    :column-id="column.id"
                    :label="column.label">
                    <FluxKanbanItem
                        v-for="card in getCards(column.id, lane.id)"
                        :key="card.id"
                        :item-id="card.id"
                        :column-id="column.id">
                        <div class="card">
                            {{ card.title }}
                        </div>
                    </FluxKanbanItem>
                </FluxKanbanColumn>
            </FluxKanbanSwimlane>
        </FluxKanban>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanColumn, FluxKanbanItem, FluxKanbanSwimlane } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const lanes: { id: string; label: string; color: FluxColor }[] = [
        {id: 'urgent', label: 'Urgent', color: 'danger'},
        {id: 'planned', label: 'Planned', color: 'gray'}
    ];

    const cards = [
        {id: 1, columnId: 'todo', laneId: 'urgent', title: 'Restore the nightly backup'},
        {id: 2, columnId: 'in-progress', laneId: 'urgent', title: 'Patch the login timeout'},
        {id: 3, columnId: 'todo', laneId: 'planned', title: 'Design system review'},
        {id: 4, columnId: 'in-progress', laneId: 'planned', title: 'Write unit tests'},
        {id: 5, columnId: 'done', laneId: 'planned', title: 'Create color palette'}
    ];

    function getCards(columnId: string, laneId: string) {
        return cards.filter(card => card.columnId === columnId && card.laneId === laneId);
    }
</script>

<style scoped>
    .card {
        padding: 12px;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }
</style>
