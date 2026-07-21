<template>
    <FluxFlow :padding="21" background="dots">
        <FluxFlowNode id="order" :x="0" :y="0">
            <FluxFlowTriggerCard title="Order Placed"/>
        </FluxFlowNode>

        <FluxFlowNode id="confirm" :x="480" :y="0">
            <FluxFlowActionCard title="Send Confirmation" icon="envelope" color="info"/>
        </FluxFlowNode>

        <FluxFlowConnection from="order" to="confirm"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
