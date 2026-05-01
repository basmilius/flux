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

            <FluxKanbanItem
                item-id="1"
                column-id="todo">
                <div class="card">
                    Design system review
                </div>
            </FluxKanbanItem>

            <FluxKanbanItem
                item-id="2"
                column-id="todo">
                <div class="card">
                    Write unit tests
                </div>
            </FluxKanbanItem>

            <FluxKanbanItem
                item-id="3"
                column-id="todo">
                <div class="card">
                    Update documentation
                </div>
            </FluxKanbanItem>
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxKanban, FluxKanbanItem, FluxKanbanColumn } from '@flux-ui/components';
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

    .card {
        padding: 12px;
        background: var(--gray-25);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius);
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }
</style>
