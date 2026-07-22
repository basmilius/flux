<template>
    <Preview flush>
        <FluxFlow :padding="21" axis="vertical">
            <FluxFlowGraph>
                <FluxFlowNode id="trigger">
                    <FluxFlowTriggerCard title="Payment received"/>
                </FluxFlowNode>

                <FluxFlowNode id="check">
                    <FluxFlowConditionCard title="Amount over €1,000?"/>
                </FluxFlowNode>

                <FluxFlowNode id="review">
                    <FluxFlowActionCard title="Manual review" icon="gauge" color="warning"/>
                </FluxFlowNode>

                <FluxFlowNode id="approve">
                    <FluxFlowActionCard title="Auto-approve" icon="circle-check" color="success"/>
                </FluxFlowNode>

                <FluxFlowNode id="book">
                    <FluxFlowActionCard title="Book the payment" icon="server"/>
                </FluxFlowNode>

                <FluxFlowConnection from="trigger" to="check"/>
                <FluxFlowConnection from="check" to="review" label="Yes"/>
                <FluxFlowConnection from="check" to="approve" label="No"/>
                <FluxFlowConnection from="review" to="book"/>
                <FluxFlowConnection from="approve" to="book"/>
            </FluxFlowGraph>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGraph, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
