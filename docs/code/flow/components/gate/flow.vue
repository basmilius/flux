<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="check" :x="0" :y="90">
            <FluxFlowConditionCard title="Payment method"/>
        </FluxFlowNode>

        <FluxFlowNode id="gate" :x="330" :y="91">
            <FluxFlowGate type="xor" color="warning"/>
        </FluxFlowNode>

        <FluxFlowNode id="card" :x="510" :y="0">
            <FluxFlowActionCard title="Charge the card" icon="money-bill"/>
        </FluxFlowNode>

        <FluxFlowNode id="invoice" :x="510" :y="180">
            <FluxFlowActionCard title="Send an invoice" icon="envelope"/>
        </FluxFlowNode>

        <FluxFlowConnection from="check" to="gate" marker-end="none"/>
        <FluxFlowConnection from="gate" to="card" from-side="top" marker-start="none" color="warning" label="Card"/>
        <FluxFlowConnection from="gate" to="invoice" from-side="bottom" marker-start="none" color="warning" label="Bank transfer"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGate, FluxFlowNode } from '@flux-ui/flow';
</script>
