<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="default-top" :x="0" :y="0">
            <FluxFlowCard title="Default"/>
        </FluxFlowNode>
        <FluxFlowNode id="default-bottom" :x="0" :y="180">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="both-top" :x="330" :y="0">
            <FluxFlowCard title="Two-way"/>
        </FluxFlowNode>
        <FluxFlowNode id="both-bottom" :x="330" :y="180">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="bare-top" :x="660" :y="0">
            <FluxFlowCard title="Bare"/>
        </FluxFlowNode>
        <FluxFlowNode id="bare-bottom" :x="660" :y="180">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowConnection from="default-top" to="default-bottom"/>
        <FluxFlowConnection from="both-top" to="both-bottom" marker-start="chevron"/>
        <FluxFlowConnection from="bare-top" to="bare-bottom" marker-start="none" marker-end="none"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
