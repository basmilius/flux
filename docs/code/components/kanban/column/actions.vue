<template>
    <FluxKanban style="max-width: 100%">
        <FluxKanbanColumn
            column-id="todo"
            label="To do">
            <template #actions>
                <FluxSecondaryButton
                    icon-leading="plus"
                    size="small"/>
            </template>

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
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanCard, FluxKanbanColumn, FluxSecondaryButton } from '@flux-ui/components';
</script>
