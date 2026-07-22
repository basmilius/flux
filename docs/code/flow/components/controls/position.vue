<template>
    <div style="height: 390px">
        <FluxFlow :padding="21" interactive background="grid">
            <FluxFlowNode id="start" :x="0" :y="0">
                <FluxFlowTerminal color="info" icon="play" label="Start"/>
            </FluxFlowNode>

            <FluxFlowNode id="run" :x="0" :y="150">
                <FluxFlowActionCard title="Run the import" icon="server"/>
            </FluxFlowNode>

            <FluxFlowConnection from="start" to="run"/>

            <FluxFlowControls position="top-right"/>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowControls, FluxFlowNode, FluxFlowTerminal } from '@flux-ui/flow';
</script>
