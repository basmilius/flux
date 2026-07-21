<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="start" :x="105" :y="0">
            <FluxFlowTerminal icon="play" label="Start" color="success"/>
        </FluxFlowNode>

        <FluxFlowNode id="collect" :x="0" :y="120">
            <FluxFlowActionCard title="Collect the readings" icon="database"/>
        </FluxFlowNode>

        <FluxFlowNode id="report" :x="0" :y="300">
            <FluxFlowActionCard title="Mail the report" icon="envelope"/>
        </FluxFlowNode>

        <FluxFlowNode id="end" :x="104" :y="480">
            <FluxFlowTerminal icon="circle-check" label="Done"/>
        </FluxFlowNode>

        <FluxFlowConnection from="start" to="collect" marker-start="none"/>
        <FluxFlowConnection from="collect" to="report"/>
        <FluxFlowConnection from="report" to="end" marker-end="none"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTerminal } from '@flux-ui/flow';
</script>
