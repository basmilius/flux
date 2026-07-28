<template>
    <FluxKanban>
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
        {id: 'blocker', label: 'Blocker', color: 'danger'},
        {id: 'feature', label: 'Feature', color: 'info'},
        {id: 'chore', label: 'Chore', color: 'gray'}
    ];

    const cards = [
        {id: 1, columnId: 'todo', laneId: 'blocker', title: 'Patch the login timeout'},
        {id: 2, columnId: 'in-progress', laneId: 'feature', title: 'Add saved views'},
        {id: 3, columnId: 'todo', laneId: 'feature', title: 'Export to CSV'},
        {id: 4, columnId: 'done', laneId: 'chore', title: 'Bump dependencies'}
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
