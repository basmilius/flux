<template>
    <FluxFlow :padding="21">
        <FluxFlowChain :gap="45">
            <FluxFlowNode id="start">
                <FluxFlowTerminal label="Start" color="success"/>
            </FluxFlowNode>

            <FluxFlowNode id="upload">
                <FluxFlowPill icon="bolt" label="File uploaded" color="info"/>
            </FluxFlowNode>

            <FluxFlowNode id="scan">
                <FluxFlowActionCard title="Scan for malware" icon="robot"/>
            </FluxFlowNode>

            <FluxFlowNode id="done">
                <FluxFlowTerminal label="Stored"/>
            </FluxFlowNode>
        </FluxFlowChain>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowNode, FluxFlowPill, FluxFlowTerminal } from '@flux-ui/flow';
</script>
