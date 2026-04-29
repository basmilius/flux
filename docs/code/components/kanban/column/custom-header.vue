<template>
    <FluxKanban style="max-width: 100%">
        <FluxKanbanColumn
            column-id="todo"
            label="To do">
            <template #header>
                <div class="custom-header">
                    <FluxBadge
                        color="primary"
                        label="3"
                        type="none"/>
                    <span class="custom-header-label">To do</span>
                </div>
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
    import { FluxBadge, FluxKanban, FluxKanbanCard, FluxKanbanColumn } from '@flux-ui/components';
</script>

<style scoped>
    .custom-header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .custom-header-label {
        font-size: .875rem;
        font-weight: 600;
        color: var(--foreground);
    }
</style>
