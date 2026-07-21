<template>
    <div style="height: 390px">
        <FluxFlow :padding="21" interactive background="dots">
            <FluxFlowNode id="request" :x="0" :y="60">
                <FluxFlowTriggerCard title="Expense submitted" subtitle="€ 640 · Travel"/>
            </FluxFlowNode>

            <FluxFlowNode id="review" :x="360" :y="0">
                <FluxFlowConditionCard
                    title="Manager approval"
                    :icon="approved ? 'circle-check' : 'hourglass-clock'"
                    :color="approved ? 'success' : 'warning'"
                    :active="!approved">
                    <FluxDescriptionList>
                        <FluxDescriptionItem label="Reviewer">
                            <span style="display: flex; align-items: center; gap: 9px">
                                <FluxAvatar :size="24" fallback="colorized" fallback-initials="JD"/>
                                Jane Doe
                            </span>
                        </FluxDescriptionItem>
                    </FluxDescriptionList>

                    <template #footer>
                        <FluxSecondaryButton
                            v-if="!approved"
                            icon-leading="check"
                            label="Approve"
                            @click="approved = true"/>
                        <FluxBadge
                            v-else
                            icon="circle-check"
                            label="Approved"
                            color="success"/>
                    </template>
                </FluxFlowConditionCard>
            </FluxFlowNode>

            <FluxFlowNode id="pay" :x="720" :y="90">
                <FluxFlowActionCard title="Reimburse" icon="money-bill" :color="approved ? 'success' : 'gray'" :active="approved">
                    Transfers the amount to the employee.
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowConnection from="request" to="review" from-side="right" to-side="left"/>
            <FluxFlowConnection from="review" to="pay" from-side="right" to-side="left" progress-color="success" :progress-value="approved ? 1 : 0"/>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
    import { ref } from 'vue';

    const approved = ref(false);
</script>
