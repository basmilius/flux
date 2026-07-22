<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="smooth-top" :x="0" :y="0">
            <FluxFlowCard title="Smoothstep"/>
        </FluxFlowNode>
        <FluxFlowNode id="smooth-bottom" :x="120" :y="210">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="bezier-top" :x="420" :y="0">
            <FluxFlowCard title="Bezier"/>
        </FluxFlowNode>
        <FluxFlowNode id="bezier-bottom" :x="540" :y="210">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="step-top" :x="840" :y="0">
            <FluxFlowCard title="Step"/>
        </FluxFlowNode>
        <FluxFlowNode id="step-bottom" :x="960" :y="210">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="straight-top" :x="1260" :y="0">
            <FluxFlowCard title="Straight"/>
        </FluxFlowNode>
        <FluxFlowNode id="straight-bottom" :x="1380" :y="210">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowConnection from="smooth-top" to="smooth-bottom" type="smoothstep"/>
        <FluxFlowConnection from="bezier-top" to="bezier-bottom" type="bezier"/>
        <FluxFlowConnection from="step-top" to="step-bottom" type="step"/>
        <FluxFlowConnection from="straight-top" to="straight-bottom" type="straight"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
