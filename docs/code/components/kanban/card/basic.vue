<template>
    <FluxKanban style="max-width: 100%">
        <FluxKanbanColumn
            column-id="todo"
            label="To do">
            <FluxKanbanCard
                card-id="1"
                column-id="todo">
                Design system review
            </FluxKanbanCard>

            <FluxKanbanCard
                card-id="2"
                column-id="todo">
                Write unit tests
            </FluxKanbanCard>

            <FluxKanbanCard
                card-id="3"
                column-id="todo">
                Update documentation
            </FluxKanbanCard>
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanCard, FluxKanbanColumn } from '@flux-ui/components';
</script>
