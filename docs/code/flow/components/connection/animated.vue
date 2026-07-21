<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="dashed-top" :x="0" :y="0">
            <FluxFlowCard title="Dashed"/>
        </FluxFlowNode>
        <FluxFlowNode id="dashed-bottom" :x="0" :y="270">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="dotted-top" :x="390" :y="0">
            <FluxFlowCard title="Dotted"/>
        </FluxFlowNode>
        <FluxFlowNode id="dotted-bottom" :x="390" :y="270">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowConnection animated dashed from="dashed-top" to="dashed-bottom" color="primary"/>
        <FluxFlowConnection animated dotted from="dotted-top" to="dotted-bottom" color="info"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
