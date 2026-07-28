<template>
    <FluxKanban>
        <FluxKanbanSwimlane
            v-for="lane in lanes"
            :key="lane.id"
            v-model:is-collapsed="collapsed[lane.id]"
            :swimlane-id="lane.id"
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
    import { ref } from 'vue';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const lanes = [
        {id: 'current', label: 'Current sprint'},
        {id: 'backlog', label: 'Backlog'}
    ];

    const collapsed = ref<Record<string, boolean>>({
        current: false,
        backlog: true
    });

    const cards = [
        {id: 1, columnId: 'todo', laneId: 'current', title: 'Design system review'},
        {id: 2, columnId: 'in-progress', laneId: 'current', title: 'Fix layout bug'},
        {id: 3, columnId: 'todo', laneId: 'backlog', title: 'Rework the settings screen'},
        {id: 4, columnId: 'todo', laneId: 'backlog', title: 'Investigate slow queries'}
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
