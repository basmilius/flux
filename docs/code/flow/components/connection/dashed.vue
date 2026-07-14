<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="solid-top" :x="0" :y="0">
            <FluxFlowCard title="Solid"/>
        </FluxFlowNode>
        <FluxFlowNode id="solid-bottom" :x="0" :y="240">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="dashed-top" :x="330" :y="0">
            <FluxFlowCard title="Dashed"/>
        </FluxFlowNode>
        <FluxFlowNode id="dashed-bottom" :x="330" :y="240">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="dotted-top" :x="660" :y="0">
            <FluxFlowCard title="Dotted"/>
        </FluxFlowNode>
        <FluxFlowNode id="dotted-bottom" :x="660" :y="240">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowConnection from="solid-top" to="solid-bottom"/>
        <FluxFlowConnection from="dashed-top" to="dashed-bottom" dashed/>
        <FluxFlowConnection from="dotted-top" to="dotted-bottom" dotted/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
