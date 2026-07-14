<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="trigger" :x="210" :y="0">
            <FluxFlowTriggerCard title="Payment Received"/>
        </FluxFlowNode>

        <FluxFlowNode id="check" :x="210" :y="270">
            <FluxFlowConditionCard title="Amount over €1,000?"/>
        </FluxFlowNode>

        <FluxFlowNode id="review" :x="0" :y="540">
            <FluxFlowActionCard title="Manual Review" label="Action" icon="gauge" color="warning"/>
        </FluxFlowNode>

        <FluxFlowNode id="approve" :x="420" :y="540">
            <FluxFlowActionCard title="Auto-approve" label="Action" icon="circle-check" color="success"/>
        </FluxFlowNode>

        <FluxFlowConnection from="trigger" to="check"/>
        <FluxFlowConnection from="check" to="review" label="yes"/>
        <FluxFlowConnection from="check" to="approve" label="no"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
