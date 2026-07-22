<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="sla" :x="0" :y="0">
            <FluxFlowConditionCard title="SLA breached"/>
        </FluxFlowNode>

        <FluxFlowNode id="replied" :x="0" :y="120">
            <FluxFlowConditionCard title="Customer replied twice"/>
        </FluxFlowNode>

        <FluxFlowNode id="reopened" :x="0" :y="240">
            <FluxFlowConditionCard title="Ticket reopened"/>
        </FluxFlowNode>

        <FluxFlowNode id="gate" :x="330" :y="121">
            <FluxFlowGate type="or" color="info"/>
        </FluxFlowNode>

        <FluxFlowNode id="notify" :x="510" :y="120">
            <FluxFlowActionCard title="Notify the support lead" icon="bell"/>
        </FluxFlowNode>

        <FluxFlowConnection from="sla" to="gate" from-side="right" to-side="top" marker-end="none"/>
        <FluxFlowConnection from="replied" to="gate" from-side="right" to-side="left" marker-end="none"/>
        <FluxFlowConnection from="reopened" to="gate" from-side="right" to-side="bottom" marker-end="none"/>
        <FluxFlowConnection from="gate" to="notify" marker-start="none" color="info"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGate, FluxFlowNode } from '@flux-ui/flow';
</script>
