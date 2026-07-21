<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="dispatch" :x="360" :y="0">
            <FluxFlowCard title="Dispatch"/>
        </FluxFlowNode>

        <FluxFlowNode id="email" :x="0" :y="240">
            <FluxFlowCard title="Email"/>
        </FluxFlowNode>
        <FluxFlowNode id="sms" :x="360" :y="240">
            <FluxFlowCard title="SMS"/>
        </FluxFlowNode>
        <FluxFlowNode id="push" :x="720" :y="240">
            <FluxFlowCard title="Push"/>
        </FluxFlowNode>

        <FluxFlowConnection from="dispatch" to="email" from-side="bottom" to-side="top" color="info" label="email"/>
        <FluxFlowConnection from="dispatch" to="sms" from-side="bottom" to-side="top" color="success" label="sms"/>
        <FluxFlowConnection from="dispatch" to="push" from-side="bottom" to-side="top" color="danger" label="push"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
