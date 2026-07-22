<template>
    <FluxFlow :padding="21" axis="vertical">
        <FluxFlowNode id="fetch" :x="0" :y="0">
            <FluxFlowActionCard title="Fetch the invoice" icon="server"/>
        </FluxFlowNode>

        <FluxFlowNode id="done" :x="0" :y="216">
            <FluxFlowTerminal color="success" icon="circle-check" label="Delivered"/>
        </FluxFlowNode>

        <FluxFlowConnection from="fetch" to="fetch" color="warning" label="Retry" dashed/>
        <FluxFlowConnection from="fetch" to="done"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTerminal } from '@flux-ui/flow';
</script>
