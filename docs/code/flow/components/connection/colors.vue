<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="dispatch" :x="390" :y="0">
            <FluxFlowCard title="Dispatch"/>
        </FluxFlowNode>

        <FluxFlowNode id="email" :x="0" :y="300">
            <FluxFlowCard title="Email"/>
        </FluxFlowNode>
        <FluxFlowNode id="sms" :x="390" :y="300">
            <FluxFlowCard title="SMS"/>
        </FluxFlowNode>
        <FluxFlowNode id="push" :x="780" :y="300">
            <FluxFlowCard title="Push"/>
        </FluxFlowNode>

        <FluxFlowConnection from="dispatch" to="email" from-side="bottom" to-side="top" color="info"/>
        <FluxFlowConnection from="dispatch" to="sms" from-side="bottom" to-side="top" color="success"/>
        <FluxFlowConnection from="dispatch" to="push" from-side="bottom" to-side="top" color="danger"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
