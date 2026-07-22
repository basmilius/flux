<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="intake" :x="0" :y="0">
            <FluxFlowPill icon="envelope" label="Intake"/>
        </FluxFlowNode>

        <FluxFlowNode id="scan" :x="240" :y="0">
            <FluxFlowPill icon="magnifying-glass" label="Scan"/>
        </FluxFlowNode>

        <FluxFlowNode id="approve" :x="480" :y="0">
            <FluxFlowPill color="success" icon="user-check" label="Approve"/>
        </FluxFlowNode>

        <FluxFlowNode id="archive" :x="750" :y="0">
            <FluxFlowPill color="warning" icon="box" label="Archive"/>
        </FluxFlowNode>

        <FluxFlowConnection from="intake" to="scan" icon="bolt"/>
        <FluxFlowConnection from="scan" to="approve" icon="hourglass-clock" label="2 days"/>
        <FluxFlowConnection from="approve" to="archive" color="warning" icon="lock"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConnection, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
</script>
