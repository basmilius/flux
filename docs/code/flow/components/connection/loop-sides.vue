<template>
    <FluxFlow :padding="45" axis="vertical">
        <FluxFlowNode id="corner" :x="0" :y="0">
            <FluxFlowActionCard title="Turns a corner" icon="rotate"/>
        </FluxFlowNode>

        <FluxFlowNode id="around" :x="0" :y="300">
            <FluxFlowActionCard title="Wraps the node" icon="rotate"/>
        </FluxFlowNode>

        <FluxFlowConnection from="corner" to="corner" from-side="right" to-side="top" color="info" label="Corner"/>
        <FluxFlowConnection from="around" to="around" from-side="right" to-side="left" color="warning" label="Around"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
