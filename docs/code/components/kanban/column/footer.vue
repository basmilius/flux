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

            <template #footer>
                <FluxSecondaryButton
                    icon-leading="plus"
                    label="Add card"
                    size="small"/>
            </template>
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanCard, FluxKanbanColumn, FluxSecondaryButton } from '@flux-ui/components';
</script>
