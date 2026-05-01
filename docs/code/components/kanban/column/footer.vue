<template>
    <FluxKanban style="max-width: 100%">
        <FluxKanbanColumn
            column-id="todo"
            label="To do">
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
    import { FluxKanban, FluxKanbanItem, FluxKanbanColumn, FluxSecondaryButton } from '@flux-ui/components';
</script>

<style scoped>
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
