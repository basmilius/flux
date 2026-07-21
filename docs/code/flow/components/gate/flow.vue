<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="check" :x="0" :y="90">
            <FluxFlowConditionCard title="Payment method"/>
        </FluxFlowNode>

        <FluxFlowNode id="gate" :x="411" :y="91">
            <FluxFlowGate type="xor" color="warning"/>
        </FluxFlowNode>

        <FluxFlowNode id="card" :x="600" :y="0">
            <FluxFlowActionCard title="Charge the card" icon="money-bill"/>
        </FluxFlowNode>

        <FluxFlowNode id="invoice" :x="600" :y="180">
            <FluxFlowActionCard title="Send an invoice" icon="envelope"/>
        </FluxFlowNode>

        <FluxFlowConnection from="check" to="gate" marker-end="none"/>
        <FluxFlowConnection from="gate" to="card" marker-start="none" label="card"/>
        <FluxFlowConnection from="gate" to="invoice" marker-start="none" label="transfer"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGate, FluxFlowNode } from '@flux-ui/flow';
</script>
