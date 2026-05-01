<template>
    <FluxKanban style="max-width: 100%">
        <FluxKanbanColumn
            column-id="in-progress"
            label="In progress">
            <FluxKanbanItem
                item-id="1"
                column-id="in-progress">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Refactor auth module</span>
                        <FluxBadge
                            color="danger"
                            label="High"
                            type="none"/>
                    </div>

                    <p class="card-description">
                        Clean up token handling and session storage.
                    </p>

                    <div class="card-footer">
                        <span class="card-assignee">Alice</span>
                    </div>
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
