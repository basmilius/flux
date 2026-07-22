<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="paid" :x="0" :y="0">
            <FluxFlowConditionCard title="Invoice is paid"/>
        </FluxFlowNode>

        <FluxFlowNode id="stock" :x="0" :y="180">
            <FluxFlowConditionCard title="Stock is reserved"/>
        </FluxFlowNode>

        <FluxFlowNode id="both" :x="330" :y="91">
            <FluxFlowGate type="and" color="primary"/>
        </FluxFlowNode>

        <FluxFlowNode id="method" :x="480" :y="91">
            <FluxFlowGate type="xor" color="warning"/>
        </FluxFlowNode>

        <FluxFlowNode id="courier" :x="660" :y="0">
            <FluxFlowActionCard title="Book a courier" icon="truck"/>
        </FluxFlowNode>

        <FluxFlowNode id="batch" :x="660" :y="180">
            <FluxFlowActionCard title="Add to the daily batch" icon="box"/>
        </FluxFlowNode>

        <FluxFlowConnection from="paid" to="both" from-side="right" to-side="top" marker-end="none"/>
        <FluxFlowConnection from="stock" to="both" from-side="right" to-side="bottom" marker-end="none"/>
        <FluxFlowConnection from="both" to="method" marker-start="none" marker-end="none" color="primary"/>
        <FluxFlowConnection from="method" to="courier" from-side="top" marker-start="none" color="warning" label="Express"/>
        <FluxFlowConnection from="method" to="batch" from-side="bottom" marker-start="none" color="warning" label="Standard"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGate, FluxFlowNode } from '@flux-ui/flow';
</script>
