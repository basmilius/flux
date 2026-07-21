<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="smooth-top" :x="0" :y="0">
            <FluxFlowCard title="Smoothstep"/>
        </FluxFlowNode>
        <FluxFlowNode id="smooth-bottom" :x="0" :y="330">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="bezier-top" :x="420" :y="0">
            <FluxFlowCard title="Bezier"/>
        </FluxFlowNode>
        <FluxFlowNode id="bezier-bottom" :x="420" :y="330">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowNode id="straight-top" :x="840" :y="0">
            <FluxFlowCard title="Straight"/>
        </FluxFlowNode>
        <FluxFlowNode id="straight-bottom" :x="840" :y="330">
            <FluxFlowCard title="Target"/>
        </FluxFlowNode>

        <FluxFlowConnection from="smooth-top" to="smooth-bottom" type="smoothstep" :waypoints="[{x: 45, y: 165}, {x: 45, y: 255}]" label="detour"/>
        <FluxFlowConnection from="bezier-top" to="bezier-bottom" type="bezier" :waypoints="[{x: 465, y: 165}, {x: 465, y: 255}]" label="detour"/>
        <FluxFlowConnection from="straight-top" to="straight-bottom" type="straight" :waypoints="[{x: 885, y: 165}, {x: 885, y: 255}]" label="detour"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
