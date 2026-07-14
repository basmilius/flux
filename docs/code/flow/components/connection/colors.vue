<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="dispatch" :x="330" :y="0">
            <FluxFlowCard title="Dispatch"/>
        </FluxFlowNode>

        <FluxFlowNode id="email" :x="0" :y="280">
            <FluxFlowCard title="Email"/>
        </FluxFlowNode>
        <FluxFlowNode id="sms" :x="330" :y="280">
            <FluxFlowCard title="SMS"/>
        </FluxFlowNode>
        <FluxFlowNode id="push" :x="660" :y="280">
            <FluxFlowCard title="Push"/>
        </FluxFlowNode>

        <FluxFlowConnection from="dispatch" to="email" color="info"/>
        <FluxFlowConnection from="dispatch" to="sms" color="success"/>
        <FluxFlowConnection from="dispatch" to="push" color="danger"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
