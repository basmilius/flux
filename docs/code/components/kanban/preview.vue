<template>
    <Preview>
        <FluxKanban style="max-width: 100%">
            <FluxKanbanColumn
                v-for="column in columns"
                :key="column.id"
                :column-id="column.id"
                :label="column.label">
                <FluxKanbanItem
                    v-for="card in getCards(column.id)"
                    :key="card.id"
                    :item-id="card.id"
                    :column-id="column.id">
                    <div class="card">
                        <span class="card-title">{{ card.title }}</span>

                        <FluxBadge
                            v-if="card.priority"
                            :color="priorityColor(card.priority)"
                            :label="card.priority"
                            type="none"/>
                    </div>
                </FluxKanbanItem>
            </FluxKanbanColumn>
        </FluxKanban>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxKanban, FluxKanbanItem, FluxKanbanColumn } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const cards = [
        {id: 1, columnId: 'todo', title: 'Design system review', priority: 'high'},
        {id: 2, columnId: 'todo', title: 'Write unit tests', priority: 'medium'},
        {id: 3, columnId: 'todo', title: 'Update documentation'},
        {id: 4, columnId: 'in-progress', title: 'Implement kanban component', priority: 'high'},
        {id: 5, columnId: 'in-progress', title: 'Fix layout bug', priority: 'low'},
        {id: 6, columnId: 'done', title: 'Set up project'},
        {id: 7, columnId: 'done', title: 'Create color palette'}
    ];

    function getCards(columnId: string) {
        return cards.filter(card => card.columnId === columnId);
    }

    function priorityColor(priority: string): FluxColor {
        if (priority === 'high') return 'danger';
        if (priority === 'medium') return 'warning';
        return 'gray';
    }
</script>

<style scoped>
    .card {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 12px;
        background: var(--gray-25);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius);
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }

    .card-title {
        flex: 1;
        font-size: .875rem;
        font-weight: 500;
        color: var(--foreground);
        line-height: 1.4;
    }
</style>
