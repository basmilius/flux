<template>
    <FluxFlow
        axis="vertical"
        :padding="21">
        <FluxFlowNode id="intake" :x="270" :y="0">
            <FluxFlowTriggerCard title="Ticket raised" icon="bell"/>
        </FluxFlowNode>

        <FluxFlowNode id="billing" :x="0" :y="150">
            <FluxFlowActionCard title="Route to billing" icon="money-bill"/>
        </FluxFlowNode>

        <FluxFlowNode id="support" :x="540" :y="150">
            <FluxFlowActionCard title="Route to support" icon="envelope"/>
        </FluxFlowNode>

        <FluxFlowConnection from="intake" to="billing"/>
        <FluxFlowConnection from="intake" to="support"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
