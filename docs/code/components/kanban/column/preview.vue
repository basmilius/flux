<template>
    <Preview>
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
            </FluxKanbanColumn>
        </FluxKanban>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanCard, FluxKanbanColumn } from '@flux-ui/components';
</script>
