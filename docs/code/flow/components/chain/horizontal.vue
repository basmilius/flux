<template>
    <FluxFlow :padding="21">
        <FluxFlowChain
            direction="horizontal"
            :gap="45">
            <FluxFlowNode id="draft">
                <FluxFlowTerminal label="Draft"/>
            </FluxFlowNode>

            <FluxFlowNode id="review">
                <FluxFlowPill icon="user-check" label="In review" color="info"/>
            </FluxFlowNode>

            <FluxFlowNode id="approved">
                <FluxFlowPill icon="circle-check" label="Approved" color="success"/>
            </FluxFlowNode>

            <FluxFlowNode id="published">
                <FluxFlowTerminal label="Published" color="success"/>
            </FluxFlowNode>
        </FluxFlowChain>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowChain, FluxFlowNode, FluxFlowPill, FluxFlowTerminal } from '@flux-ui/flow';
</script>
