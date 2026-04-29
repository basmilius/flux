<template>
    <FluxKanban @move="onMove">
        <FluxKanbanColumn
            v-for="column in columns"
            :key="column.id"
            :column-id="column.id"
            :label="column.label">
            <FluxKanbanCard
                v-for="card in getCards(column.id)"
                :key="card.id"
                :card-id="card.id"
                :column-id="column.id">
                <div class="card-header">
                    <span class="card-title">{{ card.title }}</span>
                    <FluxBadge
                        :color="priorityColor(card.priority)"
                        :label="card.priority"
                        type="none"/>
                </div>

                <p
                    v-if="card.description"
                    class="card-description">
                    {{ card.description }}
                </p>

                <div
                    v-if="card.assignee"
                    class="card-footer">
                    <span class="card-assignee">{{ card.assignee }}</span>
                </div>
            </FluxKanbanCard>
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { FluxBadge, FluxKanban, FluxKanbanCard, FluxKanbanColumn } from '@flux-ui/components';
    import type { FluxColor, FluxKanbanMoveEvent } from '@flux-ui/types';

    const columns = [
        {id: 'backlog', label: 'Backlog'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'review', label: 'Review'}
    ];

    const cards = ref([
        {id: 1, columnId: 'backlog', title: 'Refactor auth module', description: 'Clean up token handling and session storage.', priority: 'high', assignee: 'Alice'},
        {id: 2, columnId: 'backlog', title: 'Add dark mode', description: null, priority: 'low', assignee: null},
        {id: 3, columnId: 'in-progress', title: 'Kanban component', description: 'Build drag-and-drop kanban for the design system.', priority: 'high', assignee: 'Bob'},
        {id: 4, columnId: 'in-progress', title: 'Fix pagination bug', description: null, priority: 'medium', assignee: 'Alice'},
        {id: 5, columnId: 'review', title: 'Update color tokens', description: 'Align tokens with the new brand guide.', priority: 'medium', assignee: 'Carol'}
    ]);

    function getCards(columnId: string) {
        return cards.value.filter(card => card.columnId === columnId);
    }

    function priorityColor(priority: string): FluxColor {
        if (priority === 'high') return 'danger';
        if (priority === 'medium') return 'warning';
        return 'gray';
    }

    function onMove({cardId, toColumnId, beforeCardId}: FluxKanbanMoveEvent): void {
        const movedCard = cards.value.find(card => card.id === cardId);

        if (!movedCard) {
            return;
        }

        const updated = cards.value.filter(card => card.id !== cardId);
        movedCard.columnId = String(toColumnId);

        if (beforeCardId === undefined) {
            updated.push(movedCard);
        } else {
            const beforeIndex = updated.findIndex(card => card.id === beforeCardId);
            updated.splice(beforeIndex === -1 ? updated.length : beforeIndex, 0, movedCard);
        }

        cards.value = updated;
    }
</script>

<style scoped>
    .card-header {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        justify-content: space-between;
    }

    .card-title {
        font-size: .875rem;
        font-weight: 500;
        color: var(--foreground);
        line-height: 1.4;
    }

    .card-description {
        margin: 6px 0 0;
        font-size: .8125rem;
        color: var(--gray-500);
        line-height: 1.5;
    }

    .card-footer {
        display: flex;
        align-items: center;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--gray-100);
    }

    .card-assignee {
        font-size: .8125rem;
        color: var(--gray-500);
    }
</style>
