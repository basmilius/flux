<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="draft" :x="0" :y="54">
            <FluxFlowPill icon="pen" label="Article in review"/>
        </FluxFlowNode>

        <FluxFlowNode id="gate" :x="270" :y="46">
            <FluxFlowGate type="xor"/>
        </FluxFlowNode>

        <FluxFlowNode id="publish" :x="420" :y="0">
            <FluxFlowPill icon="paper-plane" label="Publish"/>
        </FluxFlowNode>

        <FluxFlowNode id="revise" :x="420" :y="108">
            <FluxFlowPill icon="rotate-left" label="Back to the author"/>
        </FluxFlowNode>

        <FluxFlowConnection from="draft" to="gate" marker-end="none"/>
        <FluxFlowConnection from="gate" to="publish" from-side="top" marker-start="none"/>
        <FluxFlowConnection from="gate" to="revise" from-side="bottom" marker-start="none"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConnection, FluxFlowGate, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
</script>
