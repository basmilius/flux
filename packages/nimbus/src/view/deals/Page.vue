<template>
    <FluxApplicationContent layout="full">
        <FluxKanban @move="onMove">
            <FluxKanbanColumn
                v-for="stage of stages"
                :key="stage"
                :column-id="stage"
                :count="dealsByStage(stage).length"
                :label="DEAL_STAGE[stage].label">
                <template #actions>
                    <FluxBadge
                        :color="DEAL_STAGE[stage].color"
                        :label="formatCompact(totalForStage(stage))"
                        type="none"/>
                </template>

                <FluxKanbanItem
                    v-for="deal of dealsByStage(stage)"
                    :key="deal.id"
                    :column-id="stage"
                    :item-id="deal.id">
                    <div class="deal">
                        <div class="deal-top">
                            <span class="deal-title">{{ deal.title }}</span>
                            <MemberAvatar
                                :member="getMember(deal.ownerId)"
                                :size="24"/>
                        </div>

                        <span class="deal-client">{{ clientName(deal.clientId) }}</span>

                        <div class="deal-footer">
                            <strong class="deal-value">{{ formatCurrency(deal.value) }}</strong>
                            <FluxChip :label="`${deal.probability}%`"/>
                        </div>
                    </div>
                </FluxKanbanItem>

                <template #empty>
                    <span class="empty">No deals.</span>
                </template>
            </FluxKanbanColumn>
        </FluxKanban>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBadge, FluxChip, FluxKanban, FluxKanbanColumn, FluxKanbanItem } from '@flux-ui/components';
    import type { FluxKanbanMoveEvent } from '@flux-ui/types';
    import MemberAvatar from '@/component/MemberAvatar.vue';
    import { defineTitle } from '@/composable';
    import { useClientsStore, useDealsStore, useTeamStore } from '@/store';
    import type { DealStage, Id } from '@/types';
    import { DEAL_STAGE, formatCompact, formatCurrency } from '@/util';

    defineTitle('sack-dollar', 'Pipeline');

    const {dealsByStage, moveDeal, totalForStage} = useDealsStore();
    const {getClient} = useClientsStore();
    const {getMember} = useTeamStore();

    const stages: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

    function clientName(clientId: Id): string {
        return getClient(clientId)?.name ?? 'Unknown client';
    }

    function onMove({itemId, toColumnId, beforeItemId}: FluxKanbanMoveEvent): void {
        moveDeal(String(itemId), String(toColumnId) as DealStage, beforeItemId === undefined ? undefined : String(beforeItemId));
    }
</script>

<style scoped>
    .deal {
        display: flex;
        flex-flow: column;
        gap: 9px;
        padding: 12px;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .deal-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 9px;
    }

    .deal-title {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        color: var(--foreground);
    }

    .deal-client {
        font-size: 13px;
        color: var(--gray-500);
    }

    .deal-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
    }

    .deal-value {
        font-variant-numeric: tabular-nums;
        color: var(--foreground);
    }

    .empty {
        display: block;
        padding: 12px;
        font-size: 13px;
        color: var(--gray-500);
    }
</style>
