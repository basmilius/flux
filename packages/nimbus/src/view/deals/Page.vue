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
                    <FluxPane variant="flat">
                        <FluxPaneBody>
                            <FluxFlex
                                direction="vertical"
                                :gap="9">
                                <FluxFlex
                                    align="center"
                                    :gap="9"
                                    justify="between">
                                    <FluxText
                                        size="medium"
                                        :weight="500">{{ deal.title }}</FluxText>
                                    <MemberAvatar
                                        :member="getMember(deal.ownerId)"
                                        :size="24"/>
                                </FluxFlex>

                                <FluxText
                                    color="muted"
                                    size="small">{{ clientName(deal.clientId) }}</FluxText>

                                <FluxFlex
                                    align="center"
                                    :gap="6"
                                    justify="between">
                                    <FluxText
                                        tabular
                                        tag="strong"
                                        :weight="700">{{ formatCurrency(deal.value) }}</FluxText>
                                    <FluxChip :label="`${deal.probability}%`"/>
                                </FluxFlex>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxKanbanItem>

                <template #empty>
                    <FluxText
                        class="empty"
                        color="muted"
                        size="small">No deals.</FluxText>
                </template>
            </FluxKanbanColumn>
        </FluxKanban>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxBadge, FluxChip, FluxFlex, FluxKanban, FluxKanbanColumn, FluxKanbanItem, FluxPane, FluxPaneBody, FluxText } from '@flux-ui/components';
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
    .empty {
        display: block;
        padding: 12px;
    }
</style>
