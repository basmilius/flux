<template>
    <FluxFlow :padding="21">
        <FluxFlowLane title="Support" :x="-21" :width="210"/>
        <FluxFlowLane title="Engineering" color="primary" :x="231" :width="210"/>

        <FluxFlowNode id="ticket" :x="0" :y="0">
            <FluxFlowPill icon="bell" label="Ticket raised" color="warning"/>
        </FluxFlowNode>

        <FluxFlowChain :x="252" :y="0" :gap="45">
            <FluxFlowNode id="triage">
                <FluxFlowPill icon="user-check" label="Triaged" color="info"/>
            </FluxFlowNode>

            <FluxFlowNode id="fix">
                <FluxFlowPill icon="rocket" label="Fix shipped" color="success"/>
            </FluxFlowNode>
        </FluxFlowChain>

        <FluxFlowConnection from="ticket" to="triage" from-side="right" to-side="left"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowChain, FluxFlowConnection, FluxFlowLane, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
</script>
