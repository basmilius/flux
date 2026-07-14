<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="check" :x="300" :y="90">
            <FluxFlowConditionCard title="Is Valid?"/>
        </FluxFlowNode>

        <FluxFlowNode id="process" :x="720" :y="90">
            <FluxFlowActionCard title="Process"/>
        </FluxFlowNode>

        <FluxFlowNode id="reject" :x="300" :y="390">
            <FluxFlowActionCard title="Reject" label="Action" icon="stopwatch" color="danger"/>
        </FluxFlowNode>

        <FluxFlowConnection from="check" to="process" from-side="right" to-side="left" label="yes"/>
        <FluxFlowConnection from="check" to="reject" from-side="bottom" to-side="top" label="no"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
