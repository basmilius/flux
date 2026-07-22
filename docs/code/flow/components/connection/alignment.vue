<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="check" :x="330" :y="90">
            <FluxFlowConditionCard title="Is Valid?"/>
        </FluxFlowNode>

        <FluxFlowNode id="approve" :x="92" :y="270">
            <FluxFlowActionCard title="Approve"/>
        </FluxFlowNode>

        <FluxFlowNode id="reject" :x="568" :y="270">
            <FluxFlowActionCard title="Reject" icon="stopwatch" color="danger"/>
        </FluxFlowNode>

        <FluxFlowConnection from="check" to="approve" from-side="bottom" from-align="start" to-side="top" to-align="end" label="Yes"/>
        <FluxFlowConnection from="check" to="reject" from-side="bottom" from-align="end" to-side="top" to-align="start" label="No"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
