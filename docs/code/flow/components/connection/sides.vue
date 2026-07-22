<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="check" :x="300" :y="90">
            <FluxFlowConditionCard title="Is Valid?"/>
        </FluxFlowNode>

        <FluxFlowNode id="process" :x="720" :y="90">
            <FluxFlowActionCard title="Process"/>
        </FluxFlowNode>

        <FluxFlowNode id="reject" :x="300" :y="240">
            <FluxFlowActionCard title="Reject" icon="stopwatch" color="danger"/>
        </FluxFlowNode>

        <FluxFlowConnection from="check" to="process" from-side="right" to-side="left" label="Yes"/>
        <FluxFlowConnection from="check" to="reject" from-side="bottom" to-side="top" label="No"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
