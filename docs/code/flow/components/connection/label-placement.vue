<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="check" :x="0" :y="0">
            <FluxFlowConditionCard title="Is Valid?"/>
        </FluxFlowNode>

        <FluxFlowNode id="process" :x="450" :y="48">
            <FluxFlowPill icon="play" label="Process"/>
        </FluxFlowNode>

        <FluxFlowNode id="review" :x="450" :y="168">
            <FluxFlowPill color="warning" icon="user-check" label="Review"/>
        </FluxFlowNode>

        <FluxFlowNode id="reject" :x="450" :y="288">
            <FluxFlowPill color="danger" icon="stopwatch" label="Reject"/>
        </FluxFlowNode>

        <FluxFlowConnection from="check" to="process" from-side="right" to-side="left" label="first-leg" label-placement="first-leg"/>
        <FluxFlowConnection from="check" to="review" from-side="right" to-side="left" label="center"/>
        <FluxFlowConnection from="check" to="reject" from-side="right" to-side="left" label="last-leg" label-placement="last-leg"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
</script>
