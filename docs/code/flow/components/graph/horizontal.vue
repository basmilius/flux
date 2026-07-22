<template>
    <div style="height: 300px">
        <FluxFlow :padding="21" interactive axis="horizontal" background="dots">
            <FluxFlowGraph direction="horizontal" :layer-gap="90">
                <FluxFlowNode id="push">
                    <FluxFlowTriggerCard title="Push to main"/>
                </FluxFlowNode>

                <FluxFlowNode id="test">
                    <FluxFlowActionCard title="Run tests" icon="gauge-high"/>
                </FluxFlowNode>

                <FluxFlowNode id="build">
                    <FluxFlowActionCard title="Build image" icon="server"/>
                </FluxFlowNode>

                <FluxFlowNode id="ship">
                    <FluxFlowActionCard title="Ship" icon="circle-check" color="success"/>
                </FluxFlowNode>

                <FluxFlowConnection from="push" to="test"/>
                <FluxFlowConnection from="test" to="build"/>
                <FluxFlowConnection from="build" to="ship"/>
            </FluxFlowGraph>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowGraph, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
